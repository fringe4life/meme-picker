import { catsData, type Cat } from './data.ts'

const emotionRadios = document.getElementById('emotion-radios') as HTMLDivElement
const getImageBtn = document.getElementById('get-image-btn') as HTMLButtonElement
const gifsOnlyOption = document.getElementById('gifs-only-option') as HTMLInputElement
const memeModalInner = document.getElementById('meme-modal-inner') as HTMLDivElement
const memeModal = document.getElementById('meme-modal') as HTMLDivElement
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn') as HTMLButtonElement


emotionRadios.addEventListener('change', highlightCheckedOption)

memeModalCloseBtn.addEventListener('click', closeModal)

getImageBtn.addEventListener('click', renderCat)

function highlightCheckedOption(e:Event){
    const radios = document.getElementsByClassName('radio') as HTMLCollectionOf<HTMLDivElement>
    for (const radio of radios){
        radio.classList.remove('highlight')
    }
    const target = e.target
    if(  target instanceof HTMLElement){
        const element = document.getElementById(target.id) as HTMLInputElement
		element?.parentElement?.classList.add("highlight");
	}
}

function closeModal(){
    memeModal.style.display = 'none'
}

function renderCat(){
    const catObject = getSingleCatObject()
    memeModalInner.innerHTML =  `
        <img 
        class="cat-img" 
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
        >
        `
    memeModal.style.display = 'flex'
}

function getRandomNumber(min:number, max: number){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getSingleCatObject(){
    const catsArray = getMatchingCatsArray() as Cat[]
    // simplified the logic using a random number without need for if... else
    const random = getRandomNumber(0, catsArray.length-1)
    return catsArray[random]
}

function getMatchingCatsArray(){     
    // must place here as otherwise element won't be in dom and will be undefined
    const selectList = document.getElementById('select-emotions') as HTMLSelectElement
    if(selectList){
        const selectedEmotion = selectList.value
        const isGif = gifsOnlyOption.checked
        
        const matchingCatsArray = catsData.filter((cat)=>{
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            return cat.emotionTags.includes(selectedEmotion)        
        })
        return matchingCatsArray 
    }  
}

function getEmotionsArray(cats: Cat[]){
    // a bit inefficient but much shorter
    const emotionsArray= new Set(cats.flatMap((cat) => cat.emotionTags))
    return Array.from(emotionsArray)
}

function renderEmotions(cats: Cat[]){
        
   
    const emotions = getEmotionsArray(cats)

    const options= emotions.map(emotion=>`<option class='option-emotions' value="${emotion}">${emotion}
    </option>`).join('')

    const selectAlternative = `<select class='select-emotions' id='select-emotions'>${options}</select>`

    // 
    
    emotionRadios.innerHTML = selectAlternative
}

renderEmotions(catsData)


