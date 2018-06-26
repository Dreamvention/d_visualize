<vd-block-products_grid>
    <div class="h3" if={setting.global.title}>{setting.global.title}</div>
    <div class="row">
        <div class="product-layout-sm col-md-{setting.global.width} col-sm-12" each={product in setting.user.products}>
            <vd-product product={product}/>
        </div>
    </div>
    <script>
		this.top = this.parent ? this.parent.top : this;
		this.level = this.parent.level;
		this.mixin({store: d_visual_designer});
		this.setting = this.opts.block.setting;
		this.block_config = _.find(this.store.getState().config.blocks, function (block) {
			return block.type == opts.block.type;
		});
		this.on('update', function () {
			this.setting = this.opts.block.setting;
		});
    </script>
</vd-block-products_grid>