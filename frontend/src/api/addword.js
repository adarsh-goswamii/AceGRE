import axios from 'axios';
const api = 'http://localhost:5000';

async function addWord(obj) {
    obj.meanings= obj.meanings.filter((obj)=> obj.meaning.length!== 0 );
    obj.mneumonics= obj.mneumonics.filter((obj)=> obj.mneumonic.length!== 0 );
    obj.sentences= obj.sentences.filter((obj)=> obj.sentence.length!== 0 );
    console.log(JSON.stringify(obj));

    const response = await axios.post(`${api}/words`, obj);

    return response;
}

export default addWord;