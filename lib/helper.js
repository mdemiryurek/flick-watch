export const getPositionOfElement = (element) => {
    const bodyRect = document.body.getBoundingClientRect(),
    elemRect = element.getBoundingClientRect();
    let offset   = elemRect.top - bodyRect.top;

    const headerElement = document.getElementsByClassName("main_menu_area");
    if (headerElement.length > 0)
        offset = offset - (headerElement[0].clientHeight + 20);

    return offset;
}

export const scrollToTop = (top) => {
    window.scroll({
        top: top,
        behavior: 'smooth'
    });
}

export const isMobileView = () => {
    const bodyWidth = document.body.offsetWidth;
    return bodyWidth < 768;
}