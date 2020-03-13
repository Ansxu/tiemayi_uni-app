export default function setFontSize() {
	var html = document.documentElement;
	html.style.fontSize = html.clientWidth / 375 * 100 + 'px';
	console.log(html.clientWidth,'html.clientWidth')
}