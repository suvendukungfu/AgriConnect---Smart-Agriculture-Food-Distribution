# ============================================================
# AgriConnect — Terraform State Backend Configuration
# ============================================================
# State is stored in S3 with DynamoDB-based locking to prevent
# concurrent modifications in team environments.
#
# BOOTSTRAP: Before first use, create these resources manually:
#   aws s3api create-bucket --bucket agriconnect-terraform-state --region ap-south-1
#   aws dynamodb create-table --table-name agriconnect-tf-lock \
#     --attribute-definitions AttributeName=LockID,AttributeType=S \
#     --key-schema AttributeName=LockID,KeyType=HASH \
#     --billing-mode PAY_PER_REQUEST

terraform {
  backend "s3" {
    bucket         = "agriconnect-terraform-state"
    key            = "infrastructure/terraform.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "agriconnect-tf-lock"
    encrypt        = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  required_version = ">= 1.6.0"
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "AgriConnect"
      ManagedBy   = "Terraform"
      Environment = var.environment
    }
  }
}
