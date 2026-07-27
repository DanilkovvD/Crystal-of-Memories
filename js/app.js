// =====================================
// ELEMENTS
// =====================================


const startButton =
    document.getElementById("startButton");


const restartButton =
    document.getElementById("restartButton");


const landing =
    document.getElementById("landing");


const terminalScreen =
    document.getElementById("terminalScreen");


const terminalOutput =
    document.getElementById("terminalOutput");


const mapScreen =
    document.getElementById("mapScreen");


const finalScreen =
    document.getElementById("finalScreen");


const finalText =
    document.getElementById("finalText");


const music =
    document.getElementById("music");




// =====================================
// LOCATIONS
// =====================================


const ruza = [
    55.6987,
    36.1956
];


const gagra = [
    43.2780,
    40.2680
];




// =====================================
// EVENTS
// =====================================


startButton.addEventListener(
    "click",
    startConnection
);



restartButton.addEventListener(
    "click",
    restartExperience
);




// =====================================
// START
// =====================================


async function startConnection(){


    startButton.disabled = true;


    startButton.textContent =
        "ПОДКЛЮЧЕНИЕ...";


    await sleep(800);



    landing.classList.add(
        "hide"
    );



    await sleep(900);



    terminalScreen.classList.add(
        "show"
    );



    await sleep(500);



    runTerminal();


}






// =====================================
// TERMINAL SEQUENCE
// =====================================


async function runTerminal(){


    terminalOutput.innerHTML = "";



    await typeLine(
        "Last login: Today"
    );


    await pause(500);



    await typeLine(
        "$ ./connect --secure"
    );


    await pause(800);



    await typeLine(
        "Booting secure runtime..."
    );


    await pause(600);



    await typeLine(
        "✓ Encryption layer loaded"
    );


    await pause(600);



    await typeLine(
        "✓ Connection protocol initialized"
    );


    await pause(700);



    await typeLine(
        ""
    );


    await typeLine(
        "Searching endpoints..."
    );


    await pause(900);



    await typeLine(
        ""
    );


    await typeLine(
        "TARGET_01 FOUND"
    );


    await typeLine(
        "Location: Ruza, Moscow Region"
    );


    await typeLine(
        "Coordinates: 55.6987 N / 36.1956 E"
    );



    await pause(900);



    await typeLine(
        ""
    );


    await typeLine(
        "TARGET_02 FOUND"
    );


    await typeLine(
        "Location: Gagra, Abkhazia"
    );


    await typeLine(
        "Coordinates: 43.2780 N / 40.2680 E"
    );



    await pause(900);



    await typeLine(
        ""
    );


    await typeLine(
        "Calculating route..."
    );


    await pause(800);



    await typeLine(
        "Distance: ~1420 km"
    );



    await pause(800);



    await typeLine(
        ""
    );


    await typeLine(
        "Establishing emotional connection..."
    );



    await pause(1000);



    await typeLine(
        "STATUS: CONNECTED"
    );



    await pause(2500);



    openMap();


}






// =====================================
// OPEN MAP
// =====================================


function openMap(){


    terminalScreen.classList.remove(
        "show"
    );



    setTimeout(()=>{


        terminalScreen.style.display =
            "none";



        mapScreen.classList.add(
            "show"
        );



        createMap();



    },1000);


}






// =====================================
// CREATE MAP
// =====================================


function createMap(){


    const map =
        L.map(
            "map",
            {

                zoomControl:false,

                attributionControl:false

            }

        );



    L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    )
    .addTo(map);





    const bounds =
        L.latLngBounds(
            ruza,
            gagra
        );



    map.fitBounds(
        bounds,
        {

            padding:[
                100,
                100
            ],

            animate:true,

            duration:2

        }
    );





    // ===============================
    // MESSAGE
    // ===============================


    const message =
        document.createElement(
            "div"
        );


    message.id =
        "connectionMessage";



    message.innerHTML = `

        <h2>
            РАССТОЯНИЕ ВСЕГО ЛИШЬ ЦИФРА
        </h2>


        <p>
            СЕКРЕТНОЕ ПОДКЛЮЧЕНИЕ УСТАНОВЛЕНО
        </p>


        <p>
            РУЗА ❤️ ГАГРА
        </p>

    `;



    mapScreen.appendChild(
        message
    );






    // ===============================
    // MARKERS
    // ===============================


    const markerIcon =
        L.divIcon({

            className:
                "route-point",

            html:

            `

            <div class="connection-marker">

            </div>

            `,


            iconSize:[
                20,
                20
            ],


            iconAnchor:[
                10,
                10
            ]

        });





    L.marker(
        ruza,
        {
            icon:markerIcon
        }

    )
    .addTo(map);





    L.marker(
        gagra,
        {
            icon:markerIcon
        }

    )
    .addTo(map);







    // ===============================
    // ROUTE
    // ===============================


    const route =
        L.polyline(

            [
                ruza,
                gagra
            ],

            {

                color:"#3DDC84",

                weight:3,

                opacity:.9

            }

        )
        .addTo(map);





    setTimeout(()=>{


        const path =
            route.getElement();



        if(path){

            path.classList.add(
                "route-line"
            );

        }


    },500);






    // ===============================
    // SHOW MESSAGE
    // ===============================


    setTimeout(()=>{


        message.classList.add(
            "show"
        );


    },1500);






    // ===============================
    // FINAL
    // ===============================


    setTimeout(()=>{


        showFinal();


    },7000);



}







// =====================================
// FINAL SCREEN
// =====================================


async function showFinal(){


    mapScreen.style.transition =
        "opacity 1.5s";



    mapScreen.style.opacity =
        "0.15";



    await sleep(1500);



    finalScreen.classList.add(
        "show"
    );



    playMusic();



    await typeFinal(

`
СОЕДИНЕНИЕ УСТАНОВЛЕНО


РАССТОЯНИЕ:
~1420 KM


НО НЕ ВСЕМУ

РАССТОЯНИЕ ЯВЛЯЕТСЯ

ПРЕГРАДОЙ.


Я СКУЧАЮ ПО ТЕБЕ ❤️
`

    );



}






function playMusic(){


    music.volume =
        0.4;


    music.play()
    .catch(()=>{


        console.log(
            "Audio waiting"
        );


    });


}







// =====================================
// TEXT EFFECTS
// =====================================


function typeLine(text){


    return new Promise(resolve=>{


        const line =
            document.createElement(
                "div"
            );


        terminalOutput.appendChild(
            line
        );



        let index = 0;



        const timer =
            setInterval(()=>{


                line.textContent =
                    text.substring(
                        0,
                        index
                    );



                index++;



                if(index > text.length){


                    clearInterval(
                        timer
                    );


                    resolve();


                }



            },35);



    });


}




function typeFinal(text){


    return new Promise(resolve=>{


        finalText.textContent =
            "";



        let index = 0;



        const timer =
            setInterval(()=>{


                finalText.textContent =
                    text.substring(
                        0,
                        index
                    );



                index++;



                if(index > text.length){


                    clearInterval(
                        timer
                    );


                    resolve();

                }



            },45);



    });


}






// =====================================
// RESTART
// =====================================


function restartExperience(){


    location.reload();


}






// =====================================
// HELPERS
// =====================================


function pause(ms){


    return new Promise(resolve=>{


        setTimeout(
            resolve,
            ms
        );


    });


}



function sleep(ms){


    return new Promise(resolve=>{


        setTimeout(
            resolve,
            ms
        );


    });


}