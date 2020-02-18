Page({

    data: {
        navbarActiveIndex: 0,
        navbarTitle: [
            "校友活动",
            "校友风采",
            "校友企业"
        ]
    },

    onNavBarTap: function(event) {
        let navbarTapIndex = event.currentTarget.dataset.navbarIndex
        this.setData({
            navbarActiveIndex: navbarTapIndex
        })
    },
    onBindAnimationFinish: function({ detail }) {
        this.setData({
            navbarActiveIndex: detail.current
        })
    }
})