<vd-product class="product-thumb">
    <div class="product-thumb_image">
        <div if={opts.product.special} class="badge">{ discount }%</div>
        <div class="add-to-fave {js--filled: this.fave}">
            <button type="button" data-toggle="tooltip" title="{ opts.button_wishlist }" onclick={ wishClick }>
                <i class={ classes }></i>
            </button>
        </div>
        <a href="{opts.product.href}">
            <img src="{opts.product.thumb}" alt="{opts.product.name}" title="{opts.product.name}" class="img-responsive" />
        </a>
    </div>
    <div class="product-thumb_body">
        <span class="product-name"><a href="{ opts.product.href }">{ truncatedName }</a></span>
        <div class="product_brand" if={opts.brand}>
        {console.log(opts)}
            <span class="product_brand_value">{ opts.brand }</span>
        </div>
        <p class="product-description">{ opts.product.description }</p>
        <virtual if={opts.product.price}>
            <div class="product-price-block">
                <virtual if={!opts.product.special}><span class="product-price">{ opts.product.symbolLeft }{opts.product.price}{ opts.product.symbolRight }</span></virtual>
                <span if={opts.product.special} class="product-price product-price_actual">{ opts.product.symbolLeft }{specialFloat}{ opts.product.symbolRight }</span> <span if={opts.product.special} class="product-price product-price_old">{ opts.product.symbolLeft }{opts.product.price}{ opts.product.symbolRight }</span>
                <span if={opts.product.tax} class="price-tax">{store.getLocal('designer.text_tax')} {opts.product.tax}</span>
            </div>
        </virtual>
                                <table class="product_attributes">
                                    <tr>
                                        <td class="product_attributes_name">{ opts.text_manufacturer }</td>
                                        <td class="product_attributes_value">{ opts.manufacturer }</td>
                                    </tr>
                                </table>
        <div class="additional-info">
            <div class="product-options">
                <div class="product-options_size">
                    <span>36 37 38 39</span>
                </div>
                <div class="product-options_color">
                    <span>6 цветов</span>
                </div>
            </div>
            <div class="rating">
                <virtual each={rating in [1,2,3,4,5]}>
                        <span if={parent.opts.product.rating < rating} class="fa fa-stack"><i class="far fa-star fa-stack-2x"></i></span>
                        <span if={parent.opts.product.rating >= rating} class="fa fa-stack"><i class="fas fa-star fa-stack-2x"></i><i class="far fa-star fa-stack-2x"></i></span>
                </virtual>
            </div>
        </div>
        <button type="button" class="btn btn-secondary btn-buy btn-block" onclick="cart.add('{opts.product.product_id}');"><span class="hidden-xs hidden-sm hidden-md">{store.getLocal('designer.button_cart')}</span></button>
    </div>

    <script>
        this.mixin({store:d_visual_designer})
        this.price = opts.product.price
        this.special = opts.product.special
        this.specialFloat = Number(this.special).toFixed(2)
        this.name = opts.product.name
        this.fave = opts.product.wishlist
        this.wasFave = false

        this.classes = {
            'fa-heart': true,
            'far': !this.fave,
            'fas': this.fave
        }

        this.nameTruncated = function() {
            var strokeLength = 40

            if (this.name.length <= strokeLength) {
                return jQuery.trim(this.name).substring(0, strokeLength).split(" ").slice(0, -1).join(" ")
            } else {
                return jQuery.trim(this.name).substring(0, strokeLength).split(" ").slice(0, -1).join(" ") + "...";
            }
        }

        this.truncatedName = this.nameTruncated()
        this.getProductDiscount = function() {
            if (opts.product.special) {
            this.special = parseFloat(this.special)
            this.price = parseFloat(this.price)
                this.discount = (this.price - this.special) / this.price * 100

                return '-' + Math.round(this.discount)
            }
        }

        this.discount = this.getProductDiscount()

        wishClick (elem) {
            if (!this.fave) {
                wishlist.add(opts.product.product_id)
                this.addToFave(elem.target)
            }
        }.bind(this)

        this.addToFave = function(elem) {
            if (!this.fave) {
                var elemAnimate = function() {
                    var r = $.Deferred();

                    $(elem).addClass('js--animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                        $(elem).removeClass('js--animated')
                    });

                    return r;
                }
                var iconFill = function() {
                    if ($(elem).hasClass('far')) {
                        this.fave = true
                        $(elem).removeClass('far')
                        $(elem).addClass('fas')
                        $(elem).closest('.add-to-fave').addClass('js--filled')
                    } else {
                        $(elem).removeClass('fas')
                        $(elem).addClass('far')
                        $(elem).closest('.add-to-fave').removeClass('js--filled')
                    }
                }

                elemAnimate().done( iconFill() );
            }
        }

        this.animated = function(elem) {
            elem.addClass('animated')
        }

        this.on('mount', function() {
            this.discount = this.getProductDiscount()
            this.truncatedName = this.nameTruncated()

            //$('.add-to-fave button').on('click', function() {
            //    wishClick($(this))
            //});
        })

        this.on('update', function() {
           this.price = opts.product.price
           this.special = opts.product.special
           this.specialFloat = Number(this.special).toFixed(2)
           this.name = opts.product.name

           this.classes = {
               'fa-heart': true,
               'far': !this.fave,
               'fas': this.fave
           }

            this.discount = this.getProductDiscount()
            this.truncatedName = this.nameTruncated()


         })

    </script>
</vd-product>