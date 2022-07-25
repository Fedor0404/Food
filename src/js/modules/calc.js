function calc () {
        // Calc
    
        const result = document.querySelector('.calculating__result span');

    
        let sex, height, weight, age, ratio;
    
        if (localStorage.getItem('sex')) {
            sex = localStorage.getItem('sex');
        } else {
            sex = 'female';
            localStorage.setItem('sex', 'female');
        }
    
    
        if (localStorage.getItem('ratio')) {
            ratio = localStorage.getItem('ratio');
        } else {
            ratio = 1.375;
            localStorage.setItem('ratio', 1.375);
        }
    
        if (localStorage.getItem('height')) {
            height = +localStorage.getItem('height');
        }
    
        if (localStorage.getItem('weight')) {
            weight = +localStorage.getItem('weight');
        }
    
        if (localStorage.getItem('age')) {
            age = +localStorage.getItem('age');
    
        }
        function initDynemicInformation(selector) {
            document.getElementById(selector).value = localStorage.getItem(selector) ;
        }
    
        
        initDynemicInformation("height");
        initDynemicInformation("weight");
        initDynemicInformation("age");
        
    
    
    
        function initLocaSettings (selector, activeClass) {
            const elements = document.querySelectorAll (selector);
    
            elements.forEach (elem => {
                elem.classList.remove(activeClass);
                if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                    elem.classList.add(activeClass);
                }
                if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                    elem.classList.add(activeClass);
                }
            });
        }
    
        initLocaSettings('#gender div', 'calculating__choose-item_active');
        initLocaSettings('.calculating__choose_big div', 'calculating__choose-item_active');
    
        // function initDynemicInformation(selector) {
    
        //     switch(localStorage.getItem(selector)) {
        //         case 'height':
        //             height = +localStorage.getItem('selector');
        //             break;
        //         case 'weight':
        //             weight = +localStorage.getItem('selector');
        //             break;
        //         case 'age':
        //             age = +localStorage.getItem('selector');
        //             break;   
            
    
        //     // if (localStorage.getItem(selector) != undefined) {
        //     //     selector = localStorage.getItem('selector');
        //     }
        // }
    
    
    
    
        function calcTotal () {
     
            if (!sex || !height || !weight || !age || !ratio) {
                result.textContent = '_____';
                return;
            }
    
            if (sex === 'female') {
                result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
            } else {
                result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
            }
        }
    
        calcTotal ();
    
        function getStaticInformation (selector, activeClass) {
            const elements = document.querySelectorAll(selector);
    
            elements.forEach(elem => {
                elem.addEventListener ('click', (e) => {
    
                    
                    if (e.target.getAttribute('data-ratio')) {
                        ratio = +e.target.getAttribute('data-ratio');
                        localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                    } else {
                        sex = e.target.getAttribute('id');
                        localStorage.setItem('sex', e.target.getAttribute('id'));
                    }
        
        
                    elements.forEach(elem => {
                        elem.classList.remove(activeClass);
                    });
        
                    e.target.classList.add(activeClass);
        
                    calcTotal ();
                });
      
            });
    
        }
    
        getStaticInformation('#gender div', 'calculating__choose-item_active');
        getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
    
    
        
    
    
        function getDynamicInformation (selector) {
            const input = document.querySelector(selector);
    
    
    
            input.addEventListener('input', () => {
    
                if (input.value.match(/\D/g)) {
                    input.style.border = '1px solid red';
                } else {
                    input.style.border = 'none';
                }
    
                switch(input.getAttribute('id')) {
                    case 'height':
                        height = +input.value;
                        break;
                    case 'weight':
                        weight = +input.value;
                        break;
                    case 'age':
                        age = +input.value;
                        break;       
                }
                calcTotal();
    
                localStorage.setItem('height', height);
                localStorage.setItem('weight', weight);
                localStorage.setItem('age', age);
                
            });
        }
        getDynamicInformation('#height');
        getDynamicInformation('#weight');
        getDynamicInformation('#age');
}

export default calc;