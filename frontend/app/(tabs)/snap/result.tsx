import { useEffect, useState } from 'react';
import { Button, Image, ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../../../firebaseConfig.js'
import LikeButton from '../../../components/LikeButton';
import { router } from 'expo-router';

export default function result() {
  const { item } = useLocalSearchParams()
  const [amazon, setAmazon] = useState([])
  const [lazada, setLazada] = useState([])
  const [ebay, setEbay] = useState([])
  const [combined, setCombined] = useState([])
  const [userId, setUserId] = useState<string | undefined>("")
  const [price_comp, setPrice] = useState(false);

  useEffect(() => {
    //stand in code
    // setAmazon([{
    //   "asin":"B0876DMR24",
    //   "product_title":"Colgate Extra Clean Toothbrush Valuepack 4s (Medium), (Pack of 4)",
    //   "product_price":"S$6.65",
    //   "unit_price":"S$1.66",
    //   "unit_count":4,
    //   "product_original_price":null,
    //   "currency":"SGD",
    //   "product_star_rating":"5",
    //   "product_num_ratings":4,
    //   "product_url":"https://www.amazon.sg/dp/B0876DMR24",
    //   "product_photo":"https://m.media-amazon.com/images/I/61hC-lBbwQL._AC_SX444_SY639_FMwebp_QL65_.jpg",
    //   "product_num_offers":1,
    //   "product_minimum_offer_price":"S$6.65",
    //   "is_best_seller":false,
    //   "is_amazon_choice":false,
    //   "is_prime":false,
    //   "climate_pledge_friendly":false,
    //   "sales_volume":"50+ bought in past month",
    //   "delivery":"Enjoy lower delivery fees for orders above S$100"
    // },
    // {
    //   "asin":"B071Y7P57G","product_title":"Oral-B CrossAction Pro-Health 7 Benefits Toothbrush, Soft, 3ct",
    //   "product_price":"S$14.02",
    //   "unit_price":"S$4.67",
    //   "unit_count":3,
    //   "product_original_price":null,
    //   "currency":"SGD",
    //   "product_star_rating":"4.8",
    //   "product_num_ratings":7,
    //   "product_url":"https://www.amazon.sg/dp/B071Y7P57G",
    //   "product_photo":"https://m.media-amazon.com/images/I/81Ylhk-X6TL._AC_SX444_SY639_FMwebp_QL65_.jpg",
    //   "product_num_offers":1,
    //   "product_minimum_offer_price":"S$14.02",
    //   "is_best_seller":false,
    //   "is_amazon_choice":false,
    //   "is_prime":false,
    //   "climate_pledge_friendly":false,
    //   "sales_volume":"50+ bought in past month",
    //   "delivery":"Enjoy lower delivery fees for orders above S$100"
    // },
    // {
    //   "asin":"B071XNYPDP",
    //   "product_title":"Oral-B 3D White Toothbrush, Soft, 3ct",
    //   "product_price":"S$12.28",
    //   "unit_price":"S$4.09",
    //   "unit_count":3,
    //   "product_original_price":null,
    //   "currency":"SGD",
    //   "product_star_rating":"5",
    //   "product_num_ratings":3,
    //   "product_url":"https://www.amazon.sg/dp/B071XNYPDP",
    //   "product_photo":"https://m.media-amazon.com/images/I/81orPht-tGL._AC_SX444_SY639_FMwebp_QL65_.jpg",
    //   "product_num_offers":1,
    //   "product_minimum_offer_price":"S$12.28",
    //   "is_best_seller":false,
    //   "is_amazon_choice":false,
    //   "is_prime":false,
    //   "climate_pledge_friendly":false,
    //   "sales_volume":null,
    //   "delivery":"Enjoy lower delivery fees for orders above S$100"
    // }])

    // setLazada([{
    //   "item_id":"2758452821",
    //   "product_url":"https://www.lazada.sg/products/-i2758452821.html",
    //   "title":"🚀[SG] 20k Nano Soft Bristles Toothbrush/ Adult Ultra Fine Super Soft Tooth Brush/ Dentist Recommended/ Wave Bristles",
    //   "img":"https://sg-live-01.slatic.net/p/611f962364916ac0e63cf6e57b056b29.jpg",
    //   "category_path":[1438,1682,1709,1715],
    //   "brand":"No Brand",
    //   "brand_id":"39704",
    //   "currency":"SGD",
    //   "price":"0.67",
    //   "price_info":{"sale_price":"0.67","origin_price":"1.39"},
    //   "discount":"52% Off",
    //   "review_info":{"average_score":"4.892638036809816","review_count":"326"},
    //   "comment_count":"326",
    //   "shop_info":{"shop_id":"1281680","shop_name":"BundleDeal.com","shop_url":"https://www.lazada.sg/shop/bundledeal.com/","seller_id":"1145301028","seller_name":"BundleDeal.com"},
    //   "sold_count":"4.5K","delivery_info":{"area_from":"Singapore"},
    //   "is_in_stock":true,
    //   "is_ad":false
    // },
    // {
    //   "item_id":"1396826887",
    //   "product_url":"https://www.lazada.sg/products/-i1396826887.html",
    //   "title":"ORAL B [BUNDLE OF 6PCS] TOOTHBRUSH Oral-B All Rounder 123 Clean Bacteria Fighter|Soft|Medium|Oral Care|",
    //   "img":"https://sg-live-01.slatic.net/p/f2fc64436539d0994cc6ed7881b98d90.jpg",
    //   "category_path":[1438,1682,1709,1715],
    //   "brand":"Oral-B",
    //   "brand_id":"27533",
    //   "currency":"SGD",
    //   "price":"5.9",
    //   "price_info":{"sale_price":"5.9","origin_price":"15.9"},
    //   "discount":"63% Off",
    //   "review_info":{"average_score":"4.838487972508591","review_count":"291"},
    //   "comment_count":"291",
    //   "shop_info":{"shop_id":"456492","shop_name":"Essential Elements","shop_url":"https://www.lazada.sg/shop/essential-elements/","seller_id":"1133454811","seller_name":"Essential Elements"},
    //   "sold_count":"1.8K",
    //   "delivery_info":{"area_from":"Singapore"},
    //   "is_in_stock":true,
    //   "is_ad":false
    // },
    // {
    //   "item_id":"1908451833",
    //   "product_url":"https://www.lazada.sg/products/-i1908451833.html",
    //   "title":"SENSODYNE Toothbrush Daily Care, Microfine Silky Bristles, Effective and Gentle Cleaning, Soft, 3s",
    //   "img":"https://sg-test-11.slatic.net/p/649e9ca7f20680d730d8f3d1a7cac5b8.jpg",
    //   "category_path":[1438,1682,1709,1715],
    //   "brand":"Sensodyne",
    //   "brand_id":"26797",
    //   "currency":"SGD",
    //   "price":"3.12",
    //   "price_info":{"sale_price":"3.12","origin_price":"3.85"},
    //   "discount":"19% Off",
    //   "review_info":{"average_score":"4.948586118251928","review_count":"783"},
    //   "comment_count":"783",
    //   "shop_info":{"shop_id":"1271605","shop_name":"Haleon","shop_url":"https://www.lazada.sg/shop/haleon/","seller_id":"1144356081","seller_name":"Haleon"},
    //   "sold_count":"5.3K",
    //   "delivery_info":{"area_from":"Singapore"},
    //   "is_in_stock":true,
    //   "is_ad":false
    // }])

    // setEbay([{
    //   "title":"SEJOY Electric Toothbrush Sonic Movement Clean Teeth Portable Rechargeable",
    //   "price":"$18.90",
    //   "shipping":"Free shipping",
    //   "location":"",
    //   "rating":"",
    //   "image":"https://i.ebayimg.com/thumbs/images/g/hScAAOSwk0Blm6yh/s-l500.jpg",
    //   "url":"https://www.ebay.com/itm/126272235841?hash=item1d66696941:g:hScAAOSwk0Blm6yh&itmprp=enc%3AAQAJAAAAwIGtNSQwXDrToiiJo5PX2IzE1%2B%2BQR41BF8CENJFB65hYJ0mAukjOwgM8kxpe65%2FccCXOj2NNVAD54s4wmiHzZS%2Fbc0gF6Zz3tQwQS9Xz3mUIMygKblKxJCZAvxfeeF6pAvnzDjdkKc6FirZ%2FoReOO3OOyUEt57506MSFvXSSw0joGggB%2BX%2F0W5H5MeI7BEUaTZk9qXmgVxugBsu73%2FRdvsKD1B8Xtj03ZreWB%2BKd9Able9l6It%2BxpTHjUBRTIx9pfA%3D%3D%7Ctkp%3ABlBMUNTuzIzzYw",
    //   "id":"c4c0d5a0-7d5d-4fd6-8d49-22a1b37dcf66"
    // },
    // {
    //   "title":"Sonic Electric Toothbrush 8 Dupont Brush Heads 5 Modes Fast Charge Smart Timer",
    //   "price":"$16.90",
    //   "shipping":"Free shipping",
    //   "location":"",
    //   "rating":"",
    //   "image":"https://i.ebayimg.com/thumbs/images/g/RMsAAOSw9wBk3JHV/s-l500.jpg",
    //   "url":"https://www.ebay.com/itm/404872492538?hash=item5e4447f5fa:g:RMsAAOSw9wBk3JHV&itmprp=enc%3AAQAJAAAAwJM%2FKXa9FRVQuPHCdgi0m6Bgu2FuCMRlU%2FNVlwc7159f4Q50ETVsU6wXtmY5oCsAaAutwbJs3%2Bwz%2BoIsbxWsJc0M0zIuPg9nAjso%2F4PQTo0VnXcwcSUH3lSxlCE8oO1obQ%2Bt%2Blnldt8zzA8rCd4iWyfBYl4ofNEnjWs9Cd3xc4R4Wxqxg%2BH3%2FH6muzWrmMlcSRHAa5iWRjmJT9t2tBv%2BcXBwplgrCegzGey4ytIS784y5qm%2B%2BXJ%2BvLxBxIExBESQOg%3D%3D%7Ctkp%3ABlBMUNTuzIzzYw",
    //   "id":"8bc4266d-b461-492b-a15a-a7a59db17058"
    // },
    // {
    //   "title":"SEJOY Electric Toothbrush Sonic Toothbrush USB Rechargeable 7 Heads 3 Modes",
    //   "price":"$18.90",
    //   "shipping":"Free shipping",
    //   "location":"",
    //   "rating":"",
    //   "image":"https://i.ebayimg.com/thumbs/images/g/3JUAAOSw3HRk3Ebc/s-l140.jpg",
    //   "url":"https://www.ebay.com/itm/364422868922?hash=item54d94bafba:g:3JUAAOSw3HRk3Ebc&itmprp=enc%3AAQAJAAAAsFBZqgb0cBBc%2BL8GeJWnm74soxGEmHy3GJGp1WQSi%2BPuydOTF2QTs9yw%2F7ORP32fO799JSWVPabWFn%2Fwz12Phy4zKxgyDaDCnSDPt0Z6DFfwah844SubM7GZ1XqUcSlLZDQOhZ12mTkP3yttx2sdSa71EoRdeIoBEj3k8WqH6vw4bXyFmfyFEw7Hkh6QY5ZUoA3UuIaiDx4x1%2Fg3X1Phje3euNJhY9vNFeljfrJ3lIap%7Ctkp%3ABlBMUNTuzIzzYw",
    //   "id":"cbee0912-b321-42db-b33f-77f8ec6e0228"
    // }])
    
    
    //uncomment below lines to use the e-commerce APIs

    fetch('https://real-time-amazon-data.p.rapidapi.com/search?query=' + item + '&country=SG', {
      method: 'get',
      headers: { 'X-RapidAPI-Key': 'ce3cc063f9msh6682049258d52bep1e8021jsn14b60338415f',
                 'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com'
       },
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);

      fetch('https://lazada-api.p.rapidapi.com/lazada/search/items?keywords=' + item + '&site=sg&page=1', {
        method: 'get',
        headers: { 'X-RapidAPI-Key': 'ce3cc063f9msh6682049258d52bep1e8021jsn14b60338415f',
                   'X-RapidAPI-Host': 'lazada-api.p.rapidapi.com'
         },
      })
      .then(res => res.json())
      .then(data2 => {
        console.log(data2);

        fetch('https://ebay-search-result.p.rapidapi.com/search/' + item, {
          method: 'get',
          headers: { 'X-RapidAPI-Key': 'ce3cc063f9msh6682049258d52bep1e8021jsn14b60338415f',
                     'X-RapidAPI-Host': 'ebay-search-result.p.rapidapi.com'
           },
        })
        .then(res => res.json())
        .then(data3 => {
          console.log(data);
          console.log(data2);
          console.log(data3);

          const amzn = data["data"]["products"];
          const laz = data2["data"]["items"];
          const e = data3["results"];

          setAmazon(amzn.length == 0 ? null : amzn.slice(0, 5))
          setLazada(laz.length == 0 ? null : laz.slice(0, 5))
          setEbay(e.length == 0 ? null : e.slice(0,5))

          for (let i = 0; i < amzn.length; i++) {
            amzn[i]["price"] = amzn[i]["product_price"].slice(2);
            amzn[i]["type"] = "amzn";
          }

          for (let i = 0; i < laz.length; i++) {
            laz[i]["type"] = "lazada";
          }

          for (let i = 0; i < e.length; i++) {
            e[i]["type"] = "ebay"
            try {;
              e[i]["price"] = String((parseFloat(e[i]["price"].slice(1)) * 1.36).toFixed(2));
            }
            catch(err) {
              e[i]["type"] = "void";
            }
          }

          const combined_array_of_products = amzn.concat(laz, e);

          //sort by price in ascending order
          // amzn.sort((a : any, b : any) => parseFloat(a["product_price"].slice(2)) - parseFloat(b["product_price"].slice(2)));
          
          // laz.sort((a : any, b : any) => parseFloat(a.price) - parseFloat(b.price));

          // e.sort((a : any, b : any) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1)));

          combined_array_of_products.sort((a : any, b : any) => parseFloat(a.price) - parseFloat(b.price));

          setCombined(combined_array_of_products.slice(0, 45))
         
        })
        .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
      
    })
    .catch(error => console.error(error));
      
    setUserId(auth.currentUser?.uid)
  }, []);

  if ((combined.length == 0)) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size='large'/>
      </View>
    )
  }

  if (price_comp) {
    return (
      <ScrollView style={styles.container}>
        <LinearGradient
          // Background Linear Gradient
          colors={['#FDBBE2', '#FBEAEB']}
          style={styles.headerContainer}
          locations={[0.5, 0.8]}
        >
          <Text style={styles.description}>{item}</Text>
        </LinearGradient>
  
        <View style={styles.buttons}>
          <Button
              title="Product search"
              
            />
          <Button
              title="Review Aggregation"
              
            />
        </View>
  
        <View style={styles.remainderContainer}>
        {
        combined.map((obj, index) => 
          obj["type"] == 'amzn' ?
          <View key={index} style={{marginLeft: 5}}>
            <Text style={styles.header}>Amazon</Text>
            <Text style={styles.words}>{obj["product_title"]}</Text>
            <Image style={styles.image} source={{uri: obj["product_photo"]}}/>
            <Text style={styles.price}>{obj["product_price"]}</Text>
            <Text style={styles.price}>{obj["product_star_rating"] + " stars"}</Text>
            <Text style={styles.desc}>{obj["sales_volume"]}</Text>
            <Text style={styles.desc}>{obj["delivery"]}</Text>
            <LikeButton 
              userId={userId}
              item={{
                title: obj["product_title"],
                image: obj["product_photo"],
                price: obj["product_price"],
                rating: obj["product_star_rating"] + " stars",
                url: obj["product_url"],
                others: obj["sales_volume"] + " | " + obj["delivery"]
              }}
            />
          </View> : obj["type"] == 'lazada' ?

          <View key={index} style={{marginLeft: 5}}>
            <Text style={styles.header}>Lazada</Text>
            <Text style={styles.words}>{obj["title"]}</Text>
            <Image style={styles.image} source={{uri: obj["img"]}}/>
            <Text style={styles.price}>{"S$" + obj["price"]}</Text>
            <Text style={styles.price}>{parseFloat(obj["review_info"]["average_score"]).toFixed(2) + " stars"}</Text>
            <Text style={styles.desc}>{obj["sold_count"] + " sold"}</Text>
            <LikeButton 
              userId={userId}
              item={{
                title: obj["title"],
                image: obj["img"],
                price: "S$" + obj["price"],
                rating: parseFloat(obj["review_info"]["average_score"]).toFixed(2) + " stars",
                url: obj["product_url"],
                others: obj["sold_count"] + " sold"
              }}
            />
          </View> : obj["type"] == 'ebay' ?

          <View key={index} style={{marginLeft: 5}}>
            <Text style={styles.header}>eBay</Text>
            <Text style={styles.words}>{obj["title"]}</Text>
            <Image style={styles.image} source={{uri: obj["image"]}}/>
            <Text style={styles.price}>{"S$" + obj["price"]}</Text>
            <Text style={styles.price}>{obj["rating"] === "" ? "" : obj["rating"] + " stars"}</Text>
            <Text style={styles.desc}>{obj["shipping"]}</Text>
            <LikeButton 
              userId={userId}
              item={{
                title: obj["title"],
                image: obj["image"],
                price: "S" + obj["price"],
                rating: obj["rating"] === "" ? "No ratings found" : obj["rating"] + " stars",
                url: obj["url"],
                others: obj["shipping"]
              }}
            />
          </View> : <View></View>
        )}
 
          </View>
      </ScrollView>
    )
  }
    
  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#FDBBE2', '#FBEAEB']}
        style={styles.headerContainer}
        locations={[0.5, 0.8]}
      >
        <Text style={styles.description}>{item}</Text>
      </LinearGradient>

      <View style={styles.buttons}>
        <Button
            title="Sort by cheapest"
            onPress={() => {
              setPrice(true)
              
            }}
          />
        <Button
            title="Review Aggregation"
            
          />
      </View>

      <Text style={styles.header2}>Amazon</Text>
      <View style={styles.remainderContainer}>
        {amazon == null ? <Text style={styles.words}>No result</Text> :
        amazon.map((obj, index) => 
          <View key={index} style={{marginLeft: 5}}>
            <Text style={styles.words}>{obj["product_title"]}</Text>
            <Image style={styles.image} source={{uri: obj["product_photo"]}}/>
            <Text style={styles.price}>{obj["product_price"]}</Text>
            <Text style={styles.price}>{obj["product_star_rating"] + " stars"}</Text>
            <Text style={styles.desc}>{obj["sales_volume"]}</Text>
            <Text style={styles.desc}>{obj["delivery"]}</Text>
            <LikeButton 
              userId={userId}
              item={{
                title: obj["product_title"],
                image: obj["product_photo"],
                price: obj["product_price"],
                rating: obj["product_star_rating"] + " stars",
                url: obj["product_url"],
                others: obj["sales_volume"] + " | " + obj["delivery"]
              }}
            />
          </View>)}

          <Text style={styles.header2}>Lazada</Text>

          
          {lazada == null ? <Text style={styles.words}>No result</Text> :
          lazada.map((obj, index) => 
          <View key={index} style={{marginLeft: 5}}>
            <Text style={styles.words}>{obj["title"]}</Text>
            <Image style={styles.image} source={{uri: obj["img"]}}/>
            <Text style={styles.price}>{"S$" + obj["price"]}</Text>
            <Text style={styles.price}>{parseFloat(obj["review_info"]["average_score"]).toFixed(2) + " stars"}</Text>
            <Text style={styles.desc}>{obj["sold_count"] + " sold"}</Text>
            <LikeButton 
              userId={userId}
              item={{
                title: obj["title"],
                image: obj["img"],
                price: "S$" + obj["price"],
                rating: parseFloat(obj["review_info"]["average_score"]).toFixed(2) + " stars",
                url: obj["product_url"],
                others: obj["sold_count"] + " sold"
              }}
            />
          </View>)}
          
          <Text style={styles.header2}>eBay</Text>

          {ebay == null ? <Text style={styles.words}>No result</Text> :
          ebay.map((obj, index) => 
          <View key={index} style={{marginLeft: 5}}>
            <Text style={styles.words}>{obj["title"]}</Text>
            <Image style={styles.image} source={{uri: obj["image"]}}/>
            <Text style={styles.price}>{"S" + obj["price"]}</Text>
            <Text style={styles.price}>{obj["rating"] === "" ? "" : obj["rating"] + " stars"}</Text>
            <Text style={styles.desc}>{obj["shipping"]}</Text>
            <LikeButton 
              userId={userId}
              item={{
                title: obj["title"],
                image: obj["image"],
                price: "S" + obj["price"],
                rating: obj["rating"] === "" ? "No ratings found" : obj["rating"] + " stars",
                url: obj["url"],
                others: obj["shipping"]
              }}
            />
          </View>)}
        </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#FBEAEB',
    borderColor: '#FBEAEB',
    marginBottom: -5
  },
  headerContainer: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#835A72",
    width: '100%',
    height: 200
  },
  remainderContainer: {
    // flex: 20
  },
  description: {
    fontSize: 40,
    color: "#F71199",
    fontStyle: 'italic',
    fontFamily: 'Cursive',
    textAlign: 'center'
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: 5,
    alignSelf: 'center'
  },
  header: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    // fontFamily: 'monospace',
    marginLeft: 5,
    // marginTop: 5,
    textAlign: 'center'
  },
  header2: {
    fontSize: 30,
    color: "black",
    fontWeight: "bold",
    // fontFamily: 'monospace',
    marginLeft: 5,
    marginTop: 5,
    textAlign: 'center'
  },
  words: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "brown",
    marginBottom: 5,
    marginTop: 20,
    textAlign: 'center'
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#E50B8C",
    textAlign: 'center'
  },
  desc: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "black",
    marginBottom: 5,
    textAlign: 'center'
  },
  activityIndicator: {
    flex: 1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

