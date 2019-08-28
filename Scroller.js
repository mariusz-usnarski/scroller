class Scroller {
    constructor(rootSelector) {
        const rootElement = document.querySelector(rootSelector);
        this.sections = document.querySelectorAll('section')
        const sectionsArr = [...this.sections]

        const currentSectionIndex = sectionsArr.findIndex(this.isScrolledIntoView);

        this.currentSectionIndex = Math.max(currentSectionIndex, 0);

        this.isTrottled = false;

        this.isScrolledIntoView(this.sections[0])
    }

    isScrolledIntoView(el) {
        const rect = el.getBoundingClientRect();
        const elemTop = rect.top;
        const elemBottom = Math.floor(rect.bottom);

        const isVissible = (elemTop >= 0) && (elemBottom <= window.innerHeight)

        return isVissible;
    }

    listenScroll = (event) => {
        if (this.isTrottled) return;
        this.isTrottled = true;
        setTimeout(() => {
            this.isTrottled = false;
        }, 1000);

        const direction = event.wheelDelta < 0 ? 1 : -1;

        this.scroll(direction);
    }
    scroll = (direction) => {
        if (direction === 1) {
            const isLastSection = this.currentSectionIndex === this.sections.length - 1;
            if (isLastSection) return;
        } else if (direction === -1) {
            const firstSetion = this.currentSectionIndex === 0;
            if (firstSetion) return;
        }
        this.currentSectionIndex = this.currentSectionIndex + direction;

        this.scrollToCurrentSection();
    }
    scrollToCurrentSection = () => {
        this.sections[this.currentSectionIndex].scrollIntoView({
            behavior: "smooth",
            block: "start",
        })
    }
}