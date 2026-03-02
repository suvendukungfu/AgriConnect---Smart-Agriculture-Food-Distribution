output "backend_repository_url" {
  value = aws_ecr_repository.backend.repository_url
}

output "ai_engine_repository_url" {
  value = aws_ecr_repository.ai_engine.repository_url
}
