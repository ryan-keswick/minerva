locals {
  instance_type = "p2.xlarge"
  ami           = "ami-0a53718c4bb3f9f22"
}

resource "aws_vpc" "minerva_gpu_vpc" {
  cidr_block = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  tags = {
    name = "minerva_gpu_vpc"
  }
}

variable "subnets_zones" {
  type    = list(string)
  default = ["us-east-1a", "us-east-1b", "us-east-1c", "us-east-1d", "us-east-1e"]
}

resource "aws_subnet" "minerva_gpu_subnets" {
  count             = 5
  vpc_id            = aws_vpc.minerva_gpu_vpc.id
  cidr_block        = cidrsubnet(aws_vpc.minerva_gpu_vpc.cidr_block, 5, count.index)
  availability_zone = var.subnets_zones[count.index]
  tags = {
    name = "minerva_gpu_subnet"
  }
}

resource "aws_security_group" "ingress_all_ssh_enabled" {
  name        = "ingress_all_ssh_enabled"
  description = "Allow all inbound ssh traffic and all outbound traffic"
  vpc_id      = aws_vpc.minerva_gpu_vpc.id

  ingress {
    cidr_blocks = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
  }

  egress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    cidr_blocks = ["0.0.0.0/0",]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    name = "minerva_gpu_security_group"
  }
}

resource "aws_internet_gateway" "minerva_gpu_ig" {
  vpc_id = aws_vpc.minerva_gpu_vpc.id
  tags = {
    name = "minerva_gpu_internet_gateway"
  }
}

resource "aws_route_table" "minerva_gpu_rt" {
  vpc_id = aws_vpc.minerva_gpu_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.minerva_gpu_ig.id
  }
  tags = {
    name = "minerva_gpu_route_table"
  }
}

resource "aws_route_table_association" "miner_gpu_rta" {
  count          = 5
  subnet_id      = aws_subnet.minerva_gpu_subnets[count.index].id
  route_table_id = aws_route_table.minerva_gpu_rt.id
}


resource "aws_launch_template" "minerva_gpu" {
  name          = "minerva_gpu"
  image_id      = local.ami
  instance_type = local.instance_type
  key_name      = "minerva-gpu"
  user_data = base64encode(templatefile(
    "launch_minerva.sh",
    {
      AWS_ACCESS_KEY_ID     = var.AWS_ACCESS_KEY_ID
      AWS_SECRET_ACCESS_KEY = var.AWS_SECRET_ACCESS_KEY
      DOCKER_IMAGE          = var.DOCKER_IMAGE
    }
  ))

  instance_market_options {
    market_type = "spot"
    spot_options {
      spot_instance_type = "one-time"
    }
  }

  monitoring {
    enabled = true
  }

  tag_specifications {
    resource_type = "instance"
    tags = {
      project = "minerva"
      environment = "production"
    }
  }
}


resource "aws_autoscaling_group" "minerva_gpu" {
  name                      = "minerva_gpu"
  max_size                  = 1
  min_size                  = 1
  desired_capacity          = 1
  vpc_zone_identifier       = aws_subnet.minerva_gpu_subnets.*.id
  launch_template {
    id = aws_launch_template.minerva_gpu.id
    version            = "$Latest"
  }

  tag {
    key                 = "project"
    value               = "minerva"
    propagate_at_launch = true
  }

  tag {
    key                 = "environment"
    value               = "production"
    propagate_at_launch = true
  }
}
