class InputEditor{

    constructor(input){

        this.input = input;

        this.minLength = parseInt(this.input.getAttribute('minlength'));
        this.maxLength = parseInt(this.input.getAttribute('maxlength'));

        this.chars = [];
        for(let i=65; i <=90 ; i++){
            this.chars.push(String.fromCharCode(i));
        }

        this.chain = new Array(this.maxLength).fill(null);
        this.charIndex = 0;
        this.stringIndex = 0;

        this.cursor = document.createElement("span");
        this.cursor.classList.add("cursor");
        this.input.parentNode.appendChild(this.cursor);
        this.cursorStep = 14.2;

        this.checked = document.createElement("span");
        this.checked.classList.add("checked");
        this.checked.classList.add("hidden");
        this.input.parentNode.appendChild(this.checked);

        this.ready = false;

        this.init();
    }

    init(){        
        this.chain[0] = this.chars[this.charIndex];
        this.update();
    }

    update(){
        
        let str = '';
        for(let i=0; i < this.chain.length; i++){


            if(this.chain[i] !== null){
                str += this.chain[i];
            }
        }

        this.input.value = str;

       this.updateCursor();
    }

    nextChar(){

        if(this.ready) return;

        this.charIndex = this.charIndex < this.chars.length - 1 ? this.charIndex + 1 : 0;
        this.chain[this.stringIndex] = this.chars[this.charIndex];
        this.update();
    }

    previousChar(){

        if(this.ready) return;

        this.charIndex = this.charIndex > 0 ? this.charIndex - 1 : this.chars.length - 1;
        this.chain[this.stringIndex] = this.chars[this.charIndex];
        this.update();
    }

    addChar(){

        if(this.ready) return;

        if(this.stringIndex >= this.maxLength - 1){
            return;
        }

        this.stringIndex++;

        if(this.stringIndex < this.chainSize() - 1){
            this.updateCharIndex();
        }else{
            this.charIndex = 0;
        }
        this.chain[this.stringIndex] = this.chars[this.charIndex];
        this.update();
    }

    removeChar(){

        if(this.ready) return;

        if(this.chainSize() <= this.minLength){
            return;
        }
        this.chain[this.stringIndex] = null;
        this.stringIndex = this.stringIndex > 0 ? this.stringIndex - 1 : 0;
        // let tab = new Array(this.maxLength).fill(null);
        // for (var i = 0; i < tab.length; i++) {
        //     tab[i].
        // }

        this.chain.sort(function(a, b){
            return a === null;
        });

        this.update();
    }

    //CURSOR
    moveLeft(){

        if(this.ready) return;

        if(this.stringIndex <= this.minLength - 1){

            return;
        }
        this.stringIndex--;
        this.updateCharIndex();
        this.updateCursor();
    }
    moveRight(){
       
        if(this.ready) return;
       
        if(this.stringIndex >= this.chainSize() - 1){
            return;
        }
        this.stringIndex++;
        this.updateCharIndex();
        this.updateCursor();
    }
    updateCharIndex(){
        if(this.chain[this.stringIndex] === null){
            return;
        }
        this.charIndex = this.chain[this.stringIndex].charCodeAt(0) - 65;
    }

    chainSize(){
        let size = 0;

        for(let i=0; i < this.chain.length; i++){
            if(this.chain[i] !== null){
                size++;
            }
        }

        return size;
    }

    updateCursor(){
        this.cursor.style.left = (((this.stringIndex + 2) * this.cursorStep) +1)+'px';
    }

    //CHECKED

    valid(){

        this.checked.classList.remove("hidden");
        this.ready = true;
        this.cursor.style.display = "none";
        this.input.classList.toggle("ready");
    }
    cancel(){
        
        this.checked.classList.add("hidden");
        this.ready = false;
        this.cursor.style.display = "block";
        this.input.classList.toggle("ready");
    }
}