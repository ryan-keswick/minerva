locals {
  instance_type = "p2.xlarge"
  ami           = "ami-01fe77030c8dc7128"
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

  network_interfaces {
    associate_public_ip_address = true
    delete_on_termination       = true
  }
}


resource "aws_autoscaling_group" "minerva_gpu" {
  name                      = "minerva_gpu"
  max_size                  = 1
  min_size                  = 1
  desired_capacity          = 1
  availability_zones        = ["us-east-1a", "us-east-1b", "us-east-1c", "us-east-1d", "us-east-1e"]
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
