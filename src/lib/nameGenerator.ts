import adjectives from "$lib/json/adjectives.json";
import animals from "$lib/json/animals.json";

//generate random name
export function generateName(){
    const adjectivesIndex = Math.floor(Math.random() * adjectives.length);
    const animalsIndex = Math.floor(Math.random() * animals.length);
    return adjectives[adjectivesIndex]+animals[animalsIndex];
}