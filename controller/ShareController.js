import StatusCodes  from 'http-status-codes';
import axios from 'axios';

// let User=[{
//     username:"faaiz alam",
//     bio:"testing deep link by faaiz",
//     id:"1",
//     userImage:"https://media.licdn.com/dms/image/v2/D4D03AQGbhv_lTSiAHg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1719138977862?e=2147483647&v=beta&t=lcWSbijZJKL8hszhP09pekTiBNh3Cr-PYaCwhqkJjoc"
// }]
// let Reel=[{
//     username:"faaiz alam",
//     bio:"testing deep link by faaiz",
//     id:"1",
//     caption:"this is testing reel caption made by faaiz"
// }]
const fetchProducts = async () => {
       
  try {
    
      const { data } = await axios.get('https://dummyjson.com/products')
     
      return data;
  } catch (error) {
      console.error("Error fetching products:", error);
  }
};
export const ShareControl=(async(req,res)=>{
    const { type, id } = req.params;
   console.log("aya",type, id )
    if ((type != "user" && type != "product") || !id) {
      res.status(StatusCodes.FORBIDDEN).send({message:"invalid body"})
    }
  
    let title, description, imageUrl, url;
  
    try {
      if (type === "user") {
        // Fetch user details from your database
        const user = await User.find((x)=>x.id==id);
        if (!user) {
          return res.status(StatusCodes.NOT_FOUND).send("User not found");
        }
        title = `Check out ${user.username}'s profile on Reelzzz`;
        description = user.bio
          ? user.bio
          : `${user.username} shares amazing reels on Reelzzz.`;
        imageUrl = user.userImage
          ? user.userImage
          : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
        url = `http://localhost:3000/user/@${user.username}`;
      } else if (type == "product") {
        let myProduct=await fetchProducts()
        const product = await myProduct.products.find((x)=>x.id==Number(id))
        console.log(product,"ÿe h")
        if (!product) {
          return res.status(StatusCodes.NOT_FOUND).send("Reel not found");
        }
        title = `Watch this amazing product by ${product.title} on Share product app`;
        description = product.description
          ? product.description
          : `Check out this cool product on Share product app.`;
        imageUrl = product.thumbnail
          ? product.thumbnail
          : "https://static-00.iconduck.com/assets.00/video-x-generic-icon-512x388-1u3h7equ.png";
        url = `http://localhost:3000/product/${product.id}`;
      }
  
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
            <meta property="og:title" content="${title}">
            <meta property="og:description" content="${description}">
            <meta property="og:image" content="${imageUrl}">
            <meta property="og:url" content="${url}">
            <meta property="og:type" content="website">
            <style>
                body {
                    background-color: #121212;
                    color: #ffffff;
                    font-family: Arial, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
                .container {
                    text-align: center;
                    padding: 20px;
                    border: 1px solid #333;
                    border-radius: 8px;
                    background-color: #1e1e1e;
                }
                .icon {
                    width: 100px;
                    height: 100px;
                    margin-bottom: 20px;
                }
                .title {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                .description {
                    font-size: 18px;
                    margin-bottom: 20px;
                }
                .image {
                    width: 100%;
                    max-width: 150px;
                    max-height:300px;
                    resize-mode:'cover';
                    border-radius: 8px;
                }
            </style>
        </head>
        <body>
            <div class="container">
            <p>CEO</p>
            <img class="icon" src="https://lh3.googleusercontent.com/-6cbWCdSJ_ak/AAAAAAAAAAI/AAAAAAAAAAA/ALKGfkmDHW8Qh7vOJIQR96yWaONOrKUPmQ/photo.jpg?sz=46" alt="App Icon">
            <div>
            </div>
                <div class="title">${title}</div>
                <div class="description">${description}</div>
                <img class="image" src="${imageUrl}" alt="Preview Image">
                <p>Download our app <a href="${url}" style="color: #1e90ff;">Drive Link or PlayStore or AppStores</a></p>
            </div>
        </body>
        </html>
      `);
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).send({message:"invalid body"})
    }


})