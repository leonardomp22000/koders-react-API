import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { getKoders, deleteKoder, createKoder } from "./api";
import { Toaster, toast } from "sonner";

export default function App() {
  // Lista de koders
  const [koders, setKoders] = useState([]);
  // Input con el useSate es reemplazado con el react hook form
  // const [text, setText] = useState("");

  // Declaracion de funciones antes del return

  //** Add Koder queda fuera de uso por que ya no se usa useState */

  //  function addKoder() {
  //    setKoders([...koders, text]);
  //  }

  // Recibe dos parametros
  // 1. Una funcion / callback
  // 2. Un arreglo de dependencias
  // UseEfect se usa para ejecutar codigo en partes especificas del ciclo de vida de un componente
  // useEfect se ejecuta en 2 momentos
  // 1. Cuando el componente se renderiza por primera vez
  // 2. Cuando alguna de las dependencias cambia
  // Si queremos que solo se renderize una vez se deja el arreglo de dependencias vacio
  // Siempre que quereamos cargar cosas de un recurso como un api donde solo sea una vez se usa un useEfect y se deja el arreglo de dependencias vacio

  useEffect(() => {
    console.log("Hola desde use Efect");
    getKoders()
      .then((koders) => {
        console.log("koders: ", koders);
        setKoders(koders);
      })
      .catch((error) => {
        console.error("Error al obtener koders", error);
        alert("Error al obtener koders");
      });
  }, []);

//  function onDelete(koderId) {
//    deleteKoder(koderId)
//      .then(() => {
//        getKoders()
//          .then((koders) => {
//            setKoders(koders);
//          })
//          .catch((error) => {
//            console.error("Error al obtener koders", error);
//            alert("Error al obtener koders");
//          });
//      })
//      .catch((error) => {
//        console.error("Error al eliminar koder", error);
//        alert("Error al eliminar koder");
//      });
//  }

async function onDelete(koderId) {
  try {
    await deleteKoder(koderId)
    toast.success("Koder eliminado")

  } catch (error) {
    console.error("Error al eliminar el koder", error)
    alert("Error al eliminar el koder")
  }
  try {
    const koders = await getKoders()
    setKoders(koders)
  } catch (error) {
    console.error("Error al obtener los koders", error)
    alert("Error al obtener los koders")
  }

}
  // Propiedades y funciones de reack hook forms
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    reset,
    setFocus
  } = useForm();

  //function removeKoder(indexToRemove) {
  //  const newKoders = koders.filter((koder, idx) => idx != indexToRemove);
  //  setKoders(newKoders);
  // }
  /**
 *   function onSubmit(data) {
    console.log(data);

    setKoders([
      ...koders,
      { firstName: data.firstName, lastName: data.lastName, email: data.email },
    ]);
    console.log(koders);
    reset();
  }
 * 
 */

  async function submit(data) {
    try {
      await createKoder({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email
      })
      const koderList = await getKoders()
      setKoders(koderList)
      setFocus("firstName")
      reset()
      toast.success("Koder creado")
    } catch (error) {
      console.error("Error al crear el koder", error)
      alert("Error al crear el koder")
    }
    
  }

  return (
    <main className="w-full min-h-screen flex-col">
    <Toaster position="top-right" richColors/>
      <p className="w-full bg-teal-600 text-black font-bold text-center">
        Koders List hook form
      </p>
      <form
        className="flex flex-row gap-2 justify-center p-5"
        onSubmit={handleSubmit(submit)}
      >
        <input
          className={clsx("p-2 rounded-md text-black w-full max-w-screen-sm", {
            "border-2 border-red-500 bg-red-300": errors.firstName,
          })}
          type="text"
          name="firstName"
          placeholder="Nombre"
          {...register("firstName", {
            required: { value: true, message: "Campo requerido" },
            minLength: { value: 3, message: "Minimo 3 caracteres" },
            maxLength: { value: 180, message: "Maximo 180 caracteres" },
          })}
          // value={text}                                         // La propiedad de valor ahora la maneja react-hook-form
          // onChange={(event) => setText(event.target.value)}    // ya que no se usa useState para manejar el valor del input no es necesario
        />
        <input
          className={clsx("p-2 rounded-md text-black w-full max-w-screen-sm", {
            "border-2 border-red-500 bg-red-300": errors.lastName,
          })}
          type="text"
          name="last-name"
          placeholder="Apellido"
          {...register("lastName", {
            required: { value: true, message: "Campo requerido" },
            minLength: { value: 3, message: "Minimo 3 caracteres" },
            maxLength: { value: 180, message: "Maximo 180 caracteres" },
          })}
          //value={text}
          //onChange={(event) => setText(event.target.value)}
          //required
        />
        <input
          className={clsx("p-2 rounded-md text-black w-full max-w-screen-sm", {
            "border-2 border-red-500 bg-red-300": errors.email,
          })}
          type="email"
          name="email"
          placeholder="Correo"
          {...register("email", {
            required: { value: true, message: "Campo requerido" },
            minLength: { value: 3, message: "Minimo 3 caracteres" },
            maxLength: { value: 180, message: "Maximo 180 caracteres" },
          })}
          //value={text}
          //onChange={(event) => setText(event.target.value)}
          //required
        />

        <button
          className="text-black px-3 rounded bg-white disabled:bg-stone-600"
          disabled={isSubmitted ? !isValid : false}
        >
          + Agregar
        </button>
      </form>
      {errors.firstName && (
        <p className="text-red-500 text-center text-sm font-semibold">
          {errors.firstName?.message}
        </p>
      )}
      {errors.lastName && (
        <p className="text-red-500 text-center text-sm font-semibold">
          {errors.lastName?.message}
        </p>
      )}
      {errors.email && (
        <p className="text-red-500 text-center text-sm font-semibold">
          {errors.email?.message}
        </p>
      )}

      <div className="max-w-screen-sm w-full mx-auto p-4 flex flex-col gap-1">
        {/**Conditional rendering */}
        {koders.length === 0 && (
          <p className="text-white/50"> No hay koders registrados</p>
        )}
        {/** Renderind list */}
        {koders.map((koder, idx) => {
          return (
            <div
              key={`koder-${idx}`}
              className="bg-white/10 rounded p-4 flex flex-row justify-between "
            >
              {/**Arreglar estilos de columna */}
              <div className="flex flex-col">
                <span className="font-bold text-white">Nombre</span>
                <p>{koder.firstName}</p>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white">Apellido</span>
                <p>{koder.lastName}</p>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white">Correo</span>
                <p>{koder.email}</p>
              </div>
              <span
               onClick={() =>  {onDelete(koder.id)}}
                className=" text-red-500 cursor-pointer hover:text-red-800 font-bold rounded px-2 py-1"
              >
                X
              </span>
            </div>
          );
        })}
      </div>
    </main>
  );
}
