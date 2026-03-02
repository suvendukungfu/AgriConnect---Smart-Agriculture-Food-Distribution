# Staging environment — mirrors prod at smaller scale
environment            = "staging"
aws_region             = "ap-south-1"
vpc_cidr               = "10.1.0.0/16"
availability_zones     = ["ap-south-1a", "ap-south-1b"]
db_instance_class      = "db.t3.small"
eks_node_instance_type = "t3.medium"
eks_desired_capacity   = 2
eks_min_size           = 1
eks_max_size           = 3
