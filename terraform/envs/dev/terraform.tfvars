# Dev environment — low cost, minimal redundancy
environment            = "dev"
aws_region             = "ap-south-1"
vpc_cidr               = "10.0.0.0/16"
availability_zones     = ["ap-south-1a", "ap-south-1b"]
db_instance_class      = "db.t3.micro"
eks_node_instance_type = "t3.small"
eks_desired_capacity   = 1
eks_min_size           = 1
eks_max_size           = 2
