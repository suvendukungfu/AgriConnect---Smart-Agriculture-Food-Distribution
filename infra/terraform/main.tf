terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

module "network" {
  source     = "./modules/network"
  name       = var.project_name
  cidr_block = var.vpc_cidr
}

module "eks" {
  source        = "./modules/eks"
  project_name  = var.project_name
  private_subnet_ids = module.network.private_subnet_ids
  vpc_id        = module.network.vpc_id
}

module "postgres" {
  source       = "./modules/postgres"
  project_name = var.project_name
  subnet_ids   = module.network.private_subnet_ids
  vpc_id       = module.network.vpc_id
}

module "redis" {
  source       = "./modules/redis"
  project_name = var.project_name
  subnet_ids   = module.network.private_subnet_ids
  vpc_id       = module.network.vpc_id
}

module "kafka" {
  source       = "./modules/kafka"
  project_name = var.project_name
  subnet_ids   = module.network.private_subnet_ids
  vpc_id       = module.network.vpc_id
}

module "storage" {
  source       = "./modules/storage"
  project_name = var.project_name
}
