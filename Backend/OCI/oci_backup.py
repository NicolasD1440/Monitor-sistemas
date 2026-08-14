import oci


BOOT_VOLUME_OCID = (
    "ocid1.bootvolume.oc1.iad."
    "abuwcljtpnxkod43ar3etk5ujwc4dheswquuc3td7gumqv6hrblx2s7yexhq"
)


def create_backup():
    signer = oci.auth.signers.InstancePrincipalsSecurityTokenSigner()

    blockstorage = oci.core.BlockstorageClient(
        config={},
        signer=signer
    )

    details = oci.core.models.CreateBootVolumeBackupDetails(
        boot_volume_id=BOOT_VOLUME_OCID,
        display_name="Gestor-de-tareas-Backup"
    )

    response = blockstorage.create_boot_volume_backup(
        create_boot_volume_backup_details=details
    )

    backup = response.data

    return {
        "id": backup.id,
        "name": backup.display_name,
        "status": backup.lifecycle_state
    }


def get_backup(backup_id):
    signer = oci.auth.signers.InstancePrincipalsSecurityTokenSigner()

    blockstorage = oci.core.BlockstorageClient(
        config={},
        signer=signer
    )

    response = blockstorage.get_boot_volume_backup(backup_id)

    backup = response.data

    return {
        "id": backup.id,
        "name": backup.display_name,
        "status": backup.lifecycle_state,
        "size_gb": backup.size_in_gbs,
        "time_created": backup.time_created
    }