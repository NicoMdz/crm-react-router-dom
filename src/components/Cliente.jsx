import { useNavigate, Form, redirect} from "react-router-dom"
import { eliminarCliente } from "../dataApi/clientes"

export async function action({params}) {
    await eliminarCliente(params.clienteID)
    return redirect("/")
}

const Cliente = ({cliente}) => {
    const navigate = useNavigate()
    const {nombre, empresa, email, telefono, id} = cliente
  return (
        <tr className="border-b">
            <td className="p-6 space-y-2">
                <p className="text-2xl text-gray-800">{nombre}</p>
                <p>{empresa}</p>
            </td>

            <td className="p-6">
                <p className="text-gray-600"><span className="text-gray-800 uppercase font-bold">Email: </span>{email}</p>
                <p className="text-gray-600"><span className="text-gray-800 uppercase font-bold">Telefono: </span>{telefono}</p>
            </td>

            <td className="p-6 flex justify-evenly">
                <button
                    type="button"
                    className="text-white bg-blue-800 rounded-md p-2 hover:bg-blue-900 uppercase font-bold text-xs"
                    onClick={ () => navigate(`/clientes/${id}/editar`) }
                >
                    Editar
                </button>
                {/* Rodeamos este button dentro de un form para poder enviar la accion delete a la fake rest api */}
                <Form
                    method="post"
                    action={`/clientes/${id}/eliminar`}
                    onSubmit={(e) => {
                        if (!confirm("¿Deseas eliminar este cliente?")) {
                            e.preventDefault()
                        }
                    }}
                > 
                <button
                    type="submit"
                    className="text-white bg-red-800 p-2 rounded-md hover:bg-red-900 uppercase font-bold text-xs"

                >
                    Eliminar
                </button>
                </Form>
            </td>
        </tr>
  )
}

export default Cliente

// import React from 'react'
// const {nombre, empresa, email, telefono, id} = cliente
// function Cliente(cliente) {
//   return (
//     <tr className="border-b">
//                  <td className="p-6">
//                    <p className="text-2xl text-gray-800">{nombre}</p>
//                 </td>
//             </tr>
//   )
// }

// export default Cliente