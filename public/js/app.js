const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const loc = search.value;
    document.querySelector('#msg-1').textContent = '';
    document.querySelector('#msg-2').textContent = 'Loading...';
    fetch(`/weather?loc=${loc}`).then((res => {
        res.json().then(data => {
            if (data.error) {
                document.querySelector('#msg-1').textContent = '';
                document.querySelector('#msg-2').textContent = data.error;
            } else {
                document.querySelector('#msg-2').textContent = '';
                document.querySelector('#msg-1').textContent = data.success;
            }
        })
    }));
});