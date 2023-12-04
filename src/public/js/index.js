function delBtn(id) {
    Swal.fire({
        title: '¿Estás seguro de eliminar el usuario?',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: '¡Usuario eliminado!',
                confirmButtonText: 'Entendido'
            })
        } else if (result.isDismissed) {
            Swal.fire({
                title: '¡Operacion cancelada!',
                confirmButtonText: 'Entendido'
            })
        }
    })
}

function resetBtn() {
    Swal.fire({
        title: '¿Estás seguro de reestablecer la contraseña?',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: '¡Contraseña reestablecida!',
                confirmButtonText: 'Entendido'
            })
        } else if (result.isDismissed) {
            Swal.fire({
                title: '¡Operacion cancelada!',
                confirmButtonText: 'Entendido'
            })
        }
    })
}