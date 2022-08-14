resource "aws_ecr_repository" "minerva" {
  name = "minerva"
  image_tag_mutability = "MUTABLE"
  image_scanning_configuration {
    scan_on_push = false
  }
}
