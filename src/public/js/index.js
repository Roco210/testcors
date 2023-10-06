const socketClient = io();
const prodRealTime = document.getElementById("realTimeProds");



socketClient.on('allProds', (data) => {

    const allprods = data.map((e) => {
        return `
            <div class="card border border-success border-4 rounded-1 " style="width: 18rem;   ">
                <img src="https://imgs.search.brave.com/dEYvjxV03Iw237s2X4mAmJi9awJmjv6kaAM4UivR68c/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jb21p/Yy5icm93c2VybGlu/Zy5jb20vZXh0cmEt/ZnJvbnQtZW5kLWJh/Y2stZW5kLnBuZw"
                    class="card-img-top" alt="18rem">
                <div class="card-body">
                    <h5 class="card-title">${e.title}</h5>
                    <p class="card-text">DESCRIPTION: ${e.description}</p>
                    <p class="card-text">ID: ${e._id}</p>
                    <p class="card-text">CODE: ${e.code}</p>
                    <p class="card-text">PRICE: ${e.price}</p>
                    <p class="card-text">STOCK: ${e.stock}</p>
                    <p class="card-text">CATEGORY: ${e.category}</p>
                    <form action="/" method="get">
                        <input type="submit" class="btn btn-primary" value="ADD TO CART">
                    </form>
                </div>
            </div>
    `
    });
    prodRealTime.innerHTML = allprods

});


