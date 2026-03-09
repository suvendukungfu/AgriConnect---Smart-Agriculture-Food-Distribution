output "eks_cluster_name" {
  value = module.eks.cluster_name
}

output "postgres_endpoint" {
  value = module.postgres.endpoint
}

output "redis_endpoint" {
  value = module.redis.endpoint
}

output "kafka_bootstrap_brokers" {
  value = module.kafka.bootstrap_brokers
}

output "assets_bucket_name" {
  value = module.storage.bucket_name
}
