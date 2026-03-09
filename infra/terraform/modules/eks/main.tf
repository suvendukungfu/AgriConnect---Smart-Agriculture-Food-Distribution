resource "aws_eks_cluster" "this" {
  name     = "${var.project_name}-eks"
  role_arn = "arn:aws:iam::123456789012:role/placeholder-eks-role"

  vpc_config {
    subnet_ids = var.private_subnet_ids
  }
}
