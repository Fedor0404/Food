function post () {
    // post 

    const forms = document.querySelectorAll('form');

    const messege = {
        loading: 'img/modal/spiner.svg',
        succses: 'Спасибо! Скоро с вами свяжемся!',
        failure: 'Что то пошло не так (',
    };


    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body:  data
        });

        return await res.json();

    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = messege.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            hight: 15px;
            margin-top: 10px;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));



            postData(' http://localhost:3000/requests', json)
            .then (data => {
                console.log(data);
                showThanksModal(messege.succses);
                statusMessage.remove();
            }).catch (() => {
                showThanksModal(messege.failure);
            }).finally (() => {
                form.reset();  
            });
        });
    }
    
    
    function showThanksModal(messege) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${messege}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);

    }

    // fetch('http://localhost:3000/menu')
    // .then(data => data.json())
    // .then(res => console.log(res));

}

module.exports = post;