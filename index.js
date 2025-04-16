function slide(sense) {
  let new_idx = -(steps + sense);

  if (new_idx < 0) new_idx = imgs_list.children.length - 1;
  if (new_idx > imgs_list.children.length - 1) new_idx = 0;

  set_imgae(new_idx);
}

function set_imgae(idx) {
  dots[-steps].children[0].classList.remove("active");
  dots[idx].children[0].classList.add("active");
  steps = -idx;
  imgs_list.style.left = steps * slider_width + "px";
}

function adjust_imgs() {
  for (let i = 0; i < imgs_list.childElementCount; i++)
    imgs_list.children[i].width = slider_width;
}

const slider = document.getElementById("slider");
const imgs_list = document.getElementById("imgs-list");
const left_btn = document.getElementById("left-btn");
const right_btn = document.getElementById("right-btn");
const dots = document.getElementById("dots-container").children;
let steps = 0,
  slider_width = slider.clientWidth,
  timeout;

adjust_imgs();

window.addEventListener("resize", () => {
  if (slider.clientWidth == slider_width) return;

  slider_width = slider.clientWidth;
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    adjust_imgs();
    imgs_list.style.left = steps * slider_width + "px";
  }, 200);
});
right_btn.addEventListener("click", () => slide(-1));
left_btn.addEventListener("click", () => slide(1));
for (let i = 0; i < dots.length; i++)
  dots[i].addEventListener("click", () => set_imgae(i));
