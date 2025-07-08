const dresses = [
        {
            name: "Casual Dress",
            Image: "https://www.beyoung.in/blog/wp-content/uploads/2020/04/SEMI-CASUAL1-compressed-931x1024.jpg "
        },
        {
            name: "Formal Dress",
            Image: " "
        },
        {
            name: "Party Dress",
            Image: " "
        },
        {
            name: "Traditional Dress",
            Image: " "
        },
        {
            name: "Wedding Dress",
            Image: " "
        },
        {
            name: "Summer Dress",
            Image: " "
        }
    ];

    let value=0
    const gallery = document.getElementById('dressGallery');
    function increase(){
        value++;
        document.getElementById('dressGallery')
    }

    dresses.forEach(dress => {
        const img = document.createElement("img");
        img.src = dress.Image;
        img.alt = dress.name;
        gallery.appendChild(img);
    });