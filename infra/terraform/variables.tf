variable "project_name" {
  type        = string
  default     = "agriconnect"
}

variable "aws_region" {
  type        = string
  default     = "ap-south-1"
}

variable "vpc_cidr" {
  type        = string
  default     = "10.40.0.0/16"
}
