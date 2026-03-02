output "vpc_id" {
  value = module.networking.vpc_id
}

output "eks_cluster_endpoint" {
  value = module.eks.cluster_endpoint
}

output "rds_endpoint" {
  value     = module.rds.db_endpoint
  sensitive = true
}

output "ecr_backend_url" {
  value = module.ecr.backend_repository_url
}

output "ecr_ai_engine_url" {
  value = module.ecr.ai_engine_repository_url
}

output "github_actions_role_arn" {
  value       = module.iam.github_actions_role_arn
  description = "The ARN of the IAM role for GitHub Actions OIDC"
}
