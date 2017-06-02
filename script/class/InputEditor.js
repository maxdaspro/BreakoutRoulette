class InputEditor{

    constructor(input){

        this.input = input;

        this.minLength = parseInt(this.input.getAttribute('minlength'));
        this.maxLength = parseInt(this.input.getAttribute('maxlength'));

        this.chars = [''];
        for(let i=65; i <=90 ; i++){
            this.chars.push(String.fromCharCode(i));
        }

        this.chain = new Array(this.maxLength).fill(null);
        this.charIndex = 0;
        this.stringIndex = 0;
    }

    update(){
        
        for(let i=0; i < this.chain.length; i++){

            let str = '';

            if(this.chain[i] !== null){
                str += this.chain[i];
            }
        }

        this.input.value = str;
    }

    nextChar(){
        this.charIndex = this.charIndex < this.chars.length - 1 ? this.chars++ : 0;
    }

    previousChar(){
        this.charIndex = this.charIndex > 0 ? this.chars-- : this.chars.length - 1;
    }

    addChar(){
        this.chain[this.stringIndex] = this.chars[this.charIndex];
    }

    removeChar(){
        this.chain[this.stringIndex] = null;
    }
}