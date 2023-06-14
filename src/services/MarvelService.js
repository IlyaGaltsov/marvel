class MarverService{
    _baseOffSet = 210;
    getResource = async (url) =>{
        let res = await fetch(url);

        if(!res.ok){
            throw new Error(`Could not fetch @{url}, status ${res.status}`);
        }
        return await res.json()
    }
    getAllCharacters = async(offset=this._baseOffSet) =>{
        const res = await this.getResource(`https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=${offset}&apikey=79e891de74347d7a9490aa8fa3c8739e`)
        return res.data.results.map(this._transformCharacter);
    }
    getCharacter = async(id) =>{
        const res=await this.getResource(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=79e891de74347d7a9490aa8fa3c8739e`)
        return this._transformCharacter(res.data.results[0]);
    }   
    _transformCharacter=(char)=>{
        return{
            id: char.id,
            name:char.name,
            description:char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail:char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage:char.urls[0].url,
            wiki:char.urls[1].url,
            comics:char.comics.items,
        }
    }
}
export default MarverService;