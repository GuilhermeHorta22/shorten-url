import Label from "../components/Label.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import { useState } from "react";

function Home()
{
    const [urlLong, setUrlLong] = useState("");
    const [urlShort, setUrlShort] = useState("");
    const [error, setError] = useState("");
    const [code, setCode] = useState("");

    //criando a nova url encurtada a partir de uma url normal
    const handleUrl = async (e) => {
        e.preventDefault();
        setError("");
        setUrlShort("");
        setCode("");

        if(!urlLong)
        {
            setError("O campo url completa deve ser preenchido.");
            return;
        }

        try
        {
            const response = await fetch("http://localhost:3003/shorten-url/", {
                method: "POST",
                body: JSON.stringify({ urlLong }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();
            if(!response.ok)
            {
                setError(data.error);
                return;
            }

            const codeApi = data.urlShort.split("/").pop();

            setUrlShort(data.urlShort); //com domain
            setCode(codeApi); //apenas o code
        }
        catch(error)
        {
            console.log("Message error: "+ error);
            setError("Erro de conexão com o servidor.");
        }
    }

    return (
        <div className="flex justify-center items-center bg-neutral-800 w-screen h-screen">
            <form onSubmit={(e) => {e.preventDefault(); handleUrl(e);} }
                className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg"
            >
                <h1 className="font-mono mb-5 text-center text-extrabold text-3xl mt-3 text-neutral-700">
                    Encurtador de URL
                </h1>

                <Label>Url Completa</Label>
                <Input
                    type="text"
                    placeholder="https://xxxxxxxxxx.com.br"
                    value={urlLong}
                    onChange={(e) => setUrlLong(e.target.value)}
                />

                {urlShort && (
                    <div className="mt-4 animate-in fade-in duration-500">
                        <Label htmlFor="shortened">
                            Url Encurtada
                        </Label>
                        <div className="flex gap-2">
                            <a 
                                href={`http://localhost:3003/shorten-url/${code}`} 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-blue-600 underline"
                            >
                                {urlShort}
                            </a>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                            Este link agora pode ser usado para acessar sua URL original.
                        </p>
                    </div>
                )}
                
                {error && <p className="font-semibold text-red-700">{error}</p>}

                <div className="flex justify-center gap-4 mt-20">
                    <Button className="bg-green-600 hover:bg-green-900">
                        Enviar
                    </Button>

                    <Button className="bg-red-500 hover:bg-red-900" 
                        onClick={() => {setUrlLong("");  setUrlShort(""); setError(""); setCode("");}}>
                        Limpar
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Home;