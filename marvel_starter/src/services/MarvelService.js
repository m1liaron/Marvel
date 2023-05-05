class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = '&apikey=ec3605c1d50d12ae1995f95b3750ae07';
    _baseOffset = 210;
    // __Name - це прогромисти договорюються не змінювати тут нічого

    getResources = async (url) => {
        let res = await fetch(url);
        
        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters =  async(offset = this._baseOffset) => {
        const res = await this.getResources(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }
    getCharacter = async (id) => {
        const res = await this.getResources(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }


    _transformCharacter = (char) => {
        const trueCharDescription = char.description ? (char.description.length > 150 ? char.description.split('').splice(0, 100).join('') + "..." : char.description) : "We don't have information about this character";
        return {
            id:char.id,
            name: char.name,
            description: trueCharDescription,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension ,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items 

        }
    }
}

export default MarvelService;


// 1 do btn try it
// 2 change in img cover in containt
// 3 list character