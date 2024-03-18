const promesa = new Promise((resolve, reject) => {
    if (new Date().getMinutes() < 40) {
        resolve("estamos a tiempo");
    } else {
        reject("nos pasamos");
    }
});

console.log("inicio");
promesa
    .then((valor) => console.log(valor))
    .catch((error) => console.error(error))
    .finally(() => console.log("fin"));
console.log("fin");
