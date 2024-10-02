"use client"

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong, faRightLeft, faArrowRotateRight, faEquals } from '@fortawesome/free-solid-svg-icons';
import { toast, Toaster } from 'sonner'

export default function Page() {
    const [fromTitle, setFromTitle] = useState<string>("Binary");
    const [from, setFrom] = useState<string>("binary");
    const [inputNum, setInputNum] = useState<string>("");
    const [toTitle, setToTitle] = useState<string>("Decimal");
    const [to, setTo] = useState<string>("decimal");
    const [output, setOutput] = useState<string>("");
    const [subHex, setSubHex] = useState<string>("");
    const [subDec, setSubDec] = useState<string>("");
    const [subBin, setSubBin] = useState<string>("");
    const capitalizeString = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

    useEffect(() => {
        resetInputOutput()
    }, [from, to])

    const binary8digit = (output: string) => {

        while (output.length < 8) {
            output = "0" + output;
        }

        return output;
    }

    const resetInputOutput = () => {
        setOutput("");
        setInputNum("");
        setSubHex("");
        setSubBin("");
        setSubDec("");
    }

    const swap = () => {
        setTo(from);
        setToTitle(capitalizeString(from))
        setFrom(to);
        setFromTitle(capitalizeString(to))
    }

    const convertNumber = (from: string, to: string, input: string) => {
        if (from == "binary" && to == "decimal") {
            if (!/^[01]+$/.test(input) || isNaN(parseInt(input, 2))) {
                toast.error("Please enter a valid binary number (only 0 and 1)");
                return -1;
            }

            return parseInt(input, 2)
        } else if (from == "binary" && to == "hexadecimal") {
            if (!/^[01]+$/.test(input) || isNaN(parseInt(input, 2))) {
                toast.error("Please enter a valid binary number (only 0 and 1)");
                return -1;
            }

            return parseInt(input, 2).toString(16).toUpperCase();
        } else if (from === "decimal" && to === "binary") {
            if (!/^\d+$/.test(input) || isNaN(parseInt(input))) {
                toast.error("Please enter a valid decimal number (only 0-9)");
                return -1;
            }
            return parseInt(input).toString(2);

        } else if (from === "decimal" && to === "hexadecimal") {
            if (!/^\d+$/.test(input) || isNaN(parseInt(input))) {
                toast.error("Please enter a valid decimal number (only 0-9)");
                return -1;
            }
            return parseInt(input).toString(16).toUpperCase();

        } else if (from === "hexadecimal" && to === "binary") {
            if (!/^[0-9a-fA-F]+$/.test(input) || isNaN(parseInt(input, 16))) {
                toast.error("Please enter a valid hexadecimal number (0-9 and A-F)");
                return -1;
            }

            return parseInt(input, 16).toString(2);

        } else if (from === "hexadecimal" && to === "decimal") {
            if (!/^[0-9a-fA-F]+$/.test(input) || isNaN(parseInt(input, 16))) {
                toast.error("Please enter a valid hexadecimal number (0-9 and A-F)");
                return -1;
            }
            return parseInt(input, 16);

        } else if (from == to) {
            toast.error("It's just the same number base why u want to convert it?");
            return -1
        } else {
            toast.error("Conversion not supported yet.");
            return -1;
        }
    };



    const handleConversion = () => {
        const result = convertNumber(from, to, inputNum);

        if (result == -1) {
            return resetInputOutput();
        }

        switch (to) {
            case "decimal":
                if(from != "hexadecimal") setSubHex(convertNumber(from, "hexadecimal", inputNum).toString())
                break;
            case "hexadecimal":
                if(from != "decimal") setSubDec(convertNumber(from, "decimal", inputNum).toString()) 
                break;
            default:
                break;
        }

        if(from != "binary"){
            setSubBin(binary8digit(convertNumber(from, "binary", inputNum).toString()))
        }

        setOutput(result.toString())
    };

    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <div className={`card-bg flex flex-col sm:p-5 p-3 py-8 lg:w-1/2 w-11/12 m-10 rounded-lg border duration-500`}>
                {/* Col 1 */}
                <div className="flex sm:gap-5 gap-2 mb-8 sm:text-base text-sm">
                    {/* From */}

                    <div className="flex flex-col w-full text-gray-50 font-bold relative">
                        <select name="from" id="from" defaultValue={"binary"} className="animSelect text-gray-white p-2 w-full rounded-lg outline-none cursor-pointer" onFocus={() => setFromTitle("From")} onChange={(e) => setFrom(e.target.value)} onBlur={() => setFromTitle(capitalizeString(from))}>
                            <option value="binary">Binary</option>
                            <option value="decimal">Decimal</option>
                            <option value="hexadecimal">Hexadecimal</option>
                        </select>
                        <h1 className="animSelect-text mb-2 absolute text-gray-500 font-bold mt-2 ml-3">{fromTitle}</h1>
                    </div>

                    <FontAwesomeIcon icon={faRightLong} className="my-auto text-black opacity-50 text-lg" />

                    {/* To */}
                    <div className="flex flex-col w-full text-gray-50 font-bold relative">
                        <select name="to" id="to" defaultValue={"decimal"} className="animSelect text-gray-white p-2 w-full rounded-lg outline-none cursor-pointer" onFocus={() => setToTitle("To")} onChange={(e) => setTo(e.target.value)} onBlur={() => setToTitle(capitalizeString(to))}>
                            <option value="binary">Binary</option>
                            <option value="decimal">Decimal</option>
                            <option value="hexadecimal">Hexadecimal</option>
                        </select>
                        <h1 className="animSelect-text mb-2 absolute text-gray-500 font-bold mt-2 ml-3">{toTitle}</h1>
                    </div>
                </div>

                {/* Col 2 */}
                <div className="flex flex-col w-full text-gray-50 font-bold relative mb-8  sm:text-base text-sm">
                    <input type="text" value={inputNum} className="animSelect input p-2 px-3 rounded-lg outline-none text-gray-500" onChange={(e) => setInputNum(e.target.value)} required />
                    <h1 className="animSelect-text input mb-2 absolute text-gray-500 font-bold mt-2 ml-3">Enter {capitalizeString(from)} Number</h1>
                </div>

                {/* Buttons */}
                <div className="flex flex-row-reverse mb-8 sm:text-base text-sm w-full justify-center sm:gap-5 gap-2">
                    <button className="convert-button w-fit rounded-lg text-gray-50 sm:px-5 px-3 py-2" onClick={handleConversion}><FontAwesomeIcon icon={faEquals}/> Convert</button>
                    <button className="convert-button swap w-fit rounded-lg text-gray-50 sm:px-5 px-3 py-2" onClick={swap}><FontAwesomeIcon icon={faRightLeft}/> Swap</button>
                    <button className=" convert-button reset w-fit rounded-lg text-gray-50 sm:px-5 px-3 py-2" onClick={resetInputOutput}><FontAwesomeIcon icon={faArrowRotateRight}/> Reset</button>
                </div>

                <div className="flex flex-col  sm:text-base text-sm">
                    {/* Col 4 */}
                    <div className={`flex flex-col w-full text-gray-50 font-bold duration-500`}>
                        <textarea name="output" id="output" value={output} className="animSelect output p-2 px-3 text-gray-500 outline-none rounded-lg h-32 resize-none" readOnly></textarea>
                        <h1 className={`anim-text ${output ? "float" : ''} mb-2 absolute text-gray-500 font-bold mt-2 ml-3`}>{capitalizeString(to)} Number</h1>
                    </div>

                    {/* Col 4 */}
                    {/* Sub Hex */}
                    <div className={`flex flex-col w-full overflow-y-auto  text-gray-50 font-bold duration-500 ${to == "decimal" && from != "hexadecimal" && from != to ? 'mt-8 h-32' : 'h-0'}`}>
                        <textarea name="output" id="output" value={subHex} className="animSelect output p-2 px-3 text-gray-500 outline-none rounded-lg h-32 resize-none" readOnly></textarea>
                        <h1 className={`${to == "decimal" && from != "hexadecimal" && from != to ? '' : 'hidden'} anim-text ${subHex ? "float" : ''} mb-2 absolute text-gray-500 font-bold mt-2 ml-3`}>Hexadecimal Number</h1>
                    </div>

                    {/* Sub Decimal */}
                    <div className={`flex flex-col w-full overflow-y-auto  text-gray-50 font-bold duration-500 ${to == "hexadecimal" && from != "decimal" && from != to ? 'mt-8 h-32' : 'h-0'}`}>
                        <textarea name="output" id="output" value={subDec} className="animSelect output p-2 px-3 text-gray-500 outline-none rounded-lg h-32 resize-none" readOnly></textarea>
                        <h1 className={`${to == "hexadecimal" && from != "decimal" && from != to ? '' : 'hidden'} anim-text ${subDec ? "float" : ''} mb-2 absolute text-gray-500 font-bold mt-2 ml-3`}>Decimal Number</h1>
                    </div>

                    {/* Sub Binary */}
                    <div className={`flex flex-col w-full overflow-y-auto  text-gray-50 font-bold duration-500 ${from != "binary" && from != to ? 'mt-8 h-32' : 'h-0'}`}>
                        <textarea name="output" id="output" value={subBin} className="animSelect output p-2 px-3 text-gray-500 outline-none rounded-lg h-32 resize-none" readOnly></textarea>
                        <h1 className={`${from != "binary" && from != to ? '' : 'hidden'} anim-text ${subBin ? "float" : ''} mb-2 absolute text-gray-500 font-bold mt-2 ml-3`}>8-Bit Binary Number</h1>
                    </div>
                </div>
            </div>
            <Toaster richColors={true} />
        </div>
    );
}