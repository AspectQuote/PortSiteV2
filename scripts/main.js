// (() => {
    /*<div class='initialbackgroundspacer'>
            <div class='scrolltoseemore'></div>
        </div>
        <div class='sitecontentcontainer'></div>*/
    var mainApp = Vue.createApp({
        data: function() {
            return {}
        }
    })

    mainApp.component(`sitecontent`, {
        mounted: function() {
            this.handleSiteResize()
            addEventListener('resize', this.handleSiteResize)
            this.$refs.sitecontent.addEventListener('scroll', this.handleContentScroll)
        },
        data: function() {
            return {
                scrollToSeeOpacity: 1,
                scrollToSeeTransform: 0,
                contentScrollHeight: 0
            }
        },
        computed: {
            scrollToSeeStyle: function() {
                return {opacity: this.scrollToSeeOpacity, transform: `translateX(-50%) translateY(-${this.scrollToSeeTransform}px)`}
            }
        },
        methods: {
            handleSiteResize: function() {
                var bgel = document.getElementsByClassName('sitebackground')[0]
                this.$refs.threecanvas.width = bgel.clientWidth
                this.$refs.threecanvas.height = bgel.clientHeight
            },
            handleContentScroll: function() {
                var docHeight = window.innerHeight
                var scrollDistance = this.$refs.sitecontent.scrollTop
                
                this.scrollToSeeTransform = Math.min(scrollDistance/3, docHeight/2)
                this.scrollToSeeOpacity = 1-Math.min(scrollDistance/(docHeight/2.3), 1)

            }
        },
        template: `
        <div class='sitebackground'>
            <canvas id="sitecanvas" ref='threecanvas'></canvas>
        </div>
        <div class='sitecontent' ref='sitecontent'>
            <div class='sitebackground initialbackgroundspacer'>
                <div class='scrolltoseemore' :style='scrollToSeeStyle'>Scroll<span class='scrolltoseemorearrow'>&#129095;</span></div>
            </div>
            <div class='sitecontentcontainer'></div>
        </div>
        `
    })

    mainApp.mount("#vueappcontainer")
// })()