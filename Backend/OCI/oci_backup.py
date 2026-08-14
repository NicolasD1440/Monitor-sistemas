import oci

signer = oci.auth.signers.InstancePrincipalsSecurityTokenSigner()

client = oci.core.BlockstorageClient(
    config={},
    signer=signer
)

print("Autenticación OCI correcta")