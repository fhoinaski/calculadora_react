import React, { useState } from 'react';

const Calculator = () => {
    const [input, setInput] = useState('');


    const handleClick = (val) => {
        const lastChar = input.slice(-1); // pega o último caractere inserido

        // Verifica se a string de entrada está vazia ou se o último caractere e o novo valor são operadores
        if ((input.length === 0 || /[\.\+\-\*\/]/.test(lastChar)) && /[\.\+\-\*\/]/.test(val)) {
            return; // se for o caso, retorna sem fazer nada
        }


        setInput(input + val);
        console.log(val);
    };



    const handleClear = () => {
        setInput('');
    };

    const handleCalculate = () => {
        setInput(eval(input).toString());
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-4">Calculadora</h1>
                <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded-lg mb-4"
                    value={input}
                    readOnly
                />
                <div className="grid grid-cols-4 gap-2">
                    <button className="bg-gray-300 rounded-lg p-2 font-bold" onClick={() => handleClick('7')}>
                        7
                    </button>
                    <button className="bg-gray-300 rounded-lg p-2 font-bold" onClick={() => handleClick('8')}>
                        8
                    </button>
                    <button className="bg-gray-300 rounded-lg p-2 font-bold" onClick={() => handleClick('9')}>
                        9
                    </button>
                    <button className="bg-gray-500 text-white rounded-lg p-2 font-bold" onClick={() => handleClick('/')}>
                        ÷
                    </button>
                    <button className="bg-gray-300 rounded-lg p-2 font-bold" onClick={() => handleClick('4')}>
                        4
                    </button>
                    <button className="bg-gray-300 rounded-lg p-2 font-bold" onClick={() => handleClick('5')}>
                        5
                    </button>
                    <button className="bg-gray-300 rounded-lg p-2 font-bold" onClick={() => handleClick('6')}>
                        6
                    </button>
                    <button className="bg-gray-500 text-white rounded-lg p-2 font-bold" onClick={() => handleClick('*')}>
                        ×
                    </button>
                    <button className="bg-gray-300 rounded-lg p-2 font-bold" onClick={() => handleClick('1')}>
                        1
                    </button>
                    <button className="bg-gray-300 rounded-lg p-2 font-bold" onClick={() => handleClick('2')}>
                        2
                    </button>
                    <button className="bg-gray-300 rounded-lg p-2 font-bold" onClick={() => handleClick('3')}>
                        3
                    </button>
                    <button className="bg-gray-500 text-white rounded-lg p-2 font-bold" onClick={() => handleClick('-')}>
                        -
                    </button>
                    <button className="bg-gray-300 rounded-lg p-2 font-bold" onClick={() => handleClick('0')}>
                        0
                    </button>
                    <button className="bg-gray-300 rounded-lg p-2 font-bold" onClick={() => handleClick('.')}>
                        .
                    </button>
                    <button className="bg-gray-500 text-white rounded-lg p-2 font-bold" onClick={() => handleCalculate()}>
                        =
                    </button>
                    <button
                        className="bg-red-500 text-white rounded-lg p-2 font-bold col-span-2"
                        onClick={() => handleClear()}
                    >
                        Limpar
                    </button>
                    <button className="bg-gray-500 text-white rounded-lg p-2 font-bold" onClick={() => handleClick('+')}>
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Calculator;