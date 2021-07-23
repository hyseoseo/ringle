const courseArr = [
  {
    id: 1,
    title: "The secret behind Netflix’s dominance",
    image_url:
      "https://s3-ap-northeast-2.amazonaws.com/ringlecourseasia/dd05fb9256aa/image/dd05fb9256aa_6bdc20177b4b.png",
  },
  {
    id: 2,
    image_url:
      "https://s3-ap-northeast-2.amazonaws.com/ringlecourseasia/dd05fb9256aa/image/dd05fb9256aa_09345a3886a1.png",
    title: "The secret behind Netflix’s dominance",
  },
  {
    id: 3,
    title: "Toyota vs. Tesla",
    image_url:
      "https://s3-ap-northeast-2.amazonaws.com/ringlecourseasia/dd05fb9256aa/image/dd05fb9256aa_ceb2ef092113.png",
  },
  {
    id: 4,
    image_url:
      "https://s3-ap-northeast-2.amazonaws.com/ringlecourseasia/dd05fb9256aa/image/dd05fb9256aa_1367ac1b1b57.png",
    title: "[ShortMemo] The ironies of the post-pandemic world",
  },
];

const ourButton = document.getElementById("ourButton");
let imgElement = document.createElement("img");
let paragraph = document.createElement("p");

const setIndex = new Promise((resolve, reject) => {
  const randomNum = Math.floor(Math.random() * courseArr.length) % 4;
  setTimeout(() => resolve(randomNum, 2000));
});

const fetchData = async (result) => {
  const response = await fetch(courseArr[result].image_url);
  imgElement.src = response.url;
  paragraph.textContent = courseArr[result].title;
  document.body.appendChild(imgElement);
  document.body.appendChild(paragraph);
};

const printCourse = () => setIndex.then(fetchData);

ourButton.addEventListener("click", printCourse);
