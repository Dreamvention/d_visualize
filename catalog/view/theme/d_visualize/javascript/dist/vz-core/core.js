"use strict";

var Checkout = {
  /**
   * Setting:
   *    When starting checout app, you must pass all
   *    of the following setting vars, substituting the 'text_...'
   *    with php <?php echo $text_... ; ?>
   *
   * @type {Object}
   */
  setting: {
    account: 'guest',
    shipping_required: true,
    step: 'account',
    $account: $('#collapse-checkout-option'),
    $payment_address: $('#collapse-payment-address'),
    $shipping_address: $('#collapse-shipping-address'),
    $shipping_method: $('#collapse-shipping-method'),
    $payment_method: $('#collapse-payment-method'),
    $confirm: $('#collapse-checkout-confirm'),
    text_checkout_account: 'text_checkout_account',
    text_checkout_option: 'text_checkout_option',
    text_checkout_payment_address: 'text_checkout_payment_address',
    text_checkout_shipping_address: 'text_checkout_shipping_address',
    text_checkout_shipping_method: 'text_checkout_shipping_method',
    text_checkout_payment_method: 'text_checkout_payment_method',
    text_checkout_confirm: 'text_checkout_confirm'
  },

  /**
   * initate your app with this function
   *
   * @param  {[type]} setting [description]
   * @return {[type]}         [description]
   */
  init: function init(setting) {
    console.log('start Checkout');
    this.setting = $.extend({}, this.setting, setting);
    this.setting.$account_title = this.setting.$account.parent().find('.panel-heading .panel-title');
    this.setting.$payment_address_title = this.setting.$payment_address.parent().find('.panel-heading .panel-title');
    this.setting.$shipping_address_title = this.setting.$shipping_address.parent().find('.panel-heading .panel-title');
    this.setting.$shipping_method_title = this.setting.$shipping_method.parent().find('.panel-heading .panel-title');
    this.setting.$payment_method_title = this.setting.$payment_method.parent().find('.panel-heading .panel-title');
    this.setting.$confirm_title = this.setting.$confirm.parent().find('.panel-heading .panel-title');
    this.setting.$account_body = this.setting.$account.find('.panel-body');
    this.setting.$payment_address_body = this.setting.$payment_address.find('.panel-body');
    this.setting.$shipping_address_body = this.setting.$shipping_address.find('.panel-body');
    this.setting.$shipping_method_body = this.setting.$shipping_method.find('.panel-body');
    this.setting.$payment_method_body = this.setting.$payment_method.find('.panel-body');
    this.setting.$confirm_body = this.setting.$confirm.find('.panel-body');
    this.render();
  },

  /**
   * Show agree terms modal: account
   */
  initAgreeModal: function initAgreeModal() {
    /* Agree to Terms */
    $(document).delegate('.agree', 'click', function (e) {
      e.preventDefault();
      $('#modal-agree').remove();
      var element = this;
      $.ajax({
        url: $(element).attr('href'),
        type: 'get',
        dataType: 'html',
        success: function success(data) {
          var html = '<div id="modal-agree" class="modal">';
          html += '  <div class="modal-dialog">';
          html += '    <div class="modal-content">';
          html += '      <div class="modal-header">';
          html += '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
          html += '        <h4 class="modal-title">' + $(element).text() + '</h4>';
          html += '      </div>';
          html += '      <div class="modal-body">' + data + '</div>';
          html += '    </div';
          html += '  </div>';
          html += '</div>';
          $('body').append(html);
          $('#modal-agree').modal('show');
        }
      });
    });
  },

  /**
   * Setter: account
   */
  setAccount: function setAccount() {
    if (this.setting.account != 'logged') {
      this.setting.account = $('input[name=\'account\']:checked').prop('value');
    }

    console.log(this.setting.account);
  },

  /**
   * Error handler
   * @param  {[type]} xhr         [description]
   * @param  {[type]} ajaxOptions [description]
   * @param  {[type]} thrownError [description]
   * @return {[type]}             [description]
   */
  errorHandler: function errorHandler(xhr, ajaxOptions, thrownError) {
    alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
  },

  /**
   * Action: changing step. It includes 6 steps:
   * 'account', 'payment_address', 'shipping_address',
   * 'shipping_method', 'payment_method', 'confirm'
   *
   * every step will unfold the body of step container.
   *
   * @param  {[type]} step [description]
   * @return {[type]}      [description]
   */
  changeStep: function changeStep(step) {
    this.setting.step = step;

    if (this.setting.step == 'account') {
      $('a[href=\'#collapse-checkout-option\']').trigger('click');
    }

    if (this.setting.step == 'payment_address') {
      $('a[href=\'#collapse-payment-address\']').trigger('click');
    }

    if (this.setting.step == 'shipping_address') {
      $('a[href=\'#collapse-shipping-address\']').trigger('click');
      this.setting.$shipping_method_title.html(this.setting.text_checkout_shipping_method);
      this.setting.$payment_method_title.html(this.setting.text_checkout_payment_method);
      this.setting.$confirm_title.html(this.setting.text_checkout_confirm);
    }

    if (this.setting.step == 'shipping_method') {
      $('a[href=\'#collapse-shipping-method\']').trigger('click');
      this.setting.$payment_method_title.html(this.setting.text_checkout_payment_method);
      this.setting.$confirm_title.html(this.setting.text_checkout_confirm);
    }

    if (this.setting.step == 'payment_method') {
      $('a[href=\'#collapse-payment-method\']').trigger('click');
      this.setting.$confirm_title.html(this.setting.text_checkout_confirm);
    }

    if (this.setting.step == 'confirm') {
      $('a[href=\'#collapse-checkout-confirm\']').trigger('click');
    }

    this.initAgreeModal();
    console.log(this.setting.step);
  },

  /**
   * Action: changing account. Fires when client picks one of the account types: register or guest
   * @return {[type]} [description]
   */
  changeAccount: function changeAccount() {
    this.setAccount();
    var that = this;

    if (that.setting.$payment_address_title.children('*').is('a')) {
      if (this.setting.account == 'register') {
        that.setting.$payment_address_title.html('<a href="#collapse-payment-address" data-toggle="collapse" data-parent="#accordion" class="accordion-toggle">' + this.setting.text_checkout_account + ' <i class="fa fa-caret-down"></i></a>');
      } else {
        that.setting.$payment_address_title.html('<a href="#collapse-payment-address" data-toggle="collapse" data-parent="#accordion" class="accordion-toggle">' + this.setting.text_checkout_payment_address + ' <i class="fa fa-caret-down"></i></a>');
      }
    } else {
      if (this.setting.account == 'register') {
        that.setting.$payment_address_title.html(this.setting.text_checkout_account);
      } else {
        that.setting.$payment_address_title.html(this.setting.text_checkout_payment_address);
      }
    }
  },

  /**
   *
   *
   *        VIEWS
   *
   *
   */

  /**
   * Returns the view of Login
   * @param  {Function} callback
   * @return {[type]}
   */
  getLoginView: function getLoginView(callback) {
    var that = this;
    $.ajax({
      url: 'index.php?route=checkout/login',
      dataType: 'html',
      success: function success(html) {
        that.setting.$account_body.html(html);
        that.setting.$account_title.html('<a href="#collapse-checkout-option" data-toggle="collapse" data-parent="#accordion" class="accordion-toggle">' + that.setting.text_checkout_option + ' <i class="fa fa-caret-down"></i></a>');
        if (typeof callback == "function") callback();
      },
      error: function error(xhr, ajaxOptions, thrownError) {
        that.errorHandler(xhr, ajaxOptions, thrownError);
      }
    });
  },

  /**
   * Returns the view of Register. If the client is not logged in
   * and has selected account option 'register'
   *
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  getRegisterView: function getRegisterView(callback) {
    var that = this;
    $.ajax({
      url: 'index.php?route=checkout/register',
      dataType: 'html',
      beforeSend: function beforeSend() {
        $('#button-account').button('loading');
      },
      complete: function complete() {
        $('#button-account').button('reset');
      },
      success: function success(html) {
        $('.alert, .text-danger').remove();
        that.setting.$payment_address_body.html(html);
        that.setting.$payment_address_title.html('<a href="#collapse-payment-address" data-toggle="collapse" data-parent="#accordion" class="accordion-toggle">' + that.setting.text_checkout_account + ' <i class="fa fa-caret-down"></i></a>');
        $('input[name=\'customer_group_id\']:checked').trigger('change');
        if (typeof callback == "function") callback();
      },
      error: function error(xhr, ajaxOptions, thrownError) {
        that.errorHandler(xhr, ajaxOptions, thrownError);
      }
    });
  },

  /**
   * Returns the view of Guest. If the client is not logged in
   * and has selected account option 'guest'
   *
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  getGuestView: function getGuestView(callback) {
    var that = this;
    $.ajax({
      url: 'index.php?route=checkout/guest',
      dataType: 'html',
      beforeSend: function beforeSend() {
        $('#button-account').button('loading');
      },
      complete: function complete() {
        $('#button-account').button('reset');
      },
      success: function success(html) {
        $('.alert, .text-danger').remove();
        that.setting.$payment_address_body.html(html);
        that.setting.$payment_address_title.html('<a href="#collapse-payment-address" data-toggle="collapse" data-parent="#accordion" class="accordion-toggle">' + that.setting.text_checkout_payment_address + ' <i class="fa fa-caret-down"></i></a>');
        $('input[name=\'customer_group_id\']:checked').trigger('change');
        if (typeof callback == "function") callback();
      },
      error: function error(xhr, ajaxOptions, thrownError) {
        that.errorHandler(xhr, ajaxOptions, thrownError);
      }
    });
  },

  /**
   * Returns the view of Payment Address. If the client is logged in.
   *
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  getPaymentAddressView: function getPaymentAddressView(callback) {
    var that = this;
    $.ajax({
      url: 'index.php?route=checkout/payment_address',
      dataType: 'html',
      success: function success(html) {
        that.setting.$payment_address_body.html(html);
        that.setting.$payment_address_title.html('<a href="#collapse-payment-address" data-toggle="collapse" data-parent="#accordion" class="accordion-toggle">' + that.setting.text_checkout_payment_address + ' <i class="fa fa-caret-down"></i></a>');
        $('input[name=\'customer_group_id\']:checked').trigger('change');
        if (typeof callback == "function") callback();
      },
      error: function error(xhr, ajaxOptions, thrownError) {
        that.errorHandler(xhr, ajaxOptions, thrownError);
      }
    });
  },

  /**
   * Returns the view of Shipping Address. If the client is logged in
   * or if he is not logged in but has selected 'register' account option
   *
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  getShippingAddressView: function getShippingAddressView(callback) {
    var that = this;
    $.ajax({
      url: 'index.php?route=checkout/shipping_address',
      dataType: 'html',
      success: function success(html) {
        that.setting.$shipping_address_body.html(html);
        that.setting.$shipping_address_title.html('<a href="#collapse-shipping-address" data-toggle="collapse" data-parent="#accordion" class="accordion-toggle">' + that.setting.text_checkout_shipping_address + ' <i class="fa fa-caret-down"></i></a>');
        if (typeof callback == "function") callback();
      },
      error: function error(xhr, ajaxOptions, thrownError) {
        that.errorHandler(xhr, ajaxOptions, thrownError);
      }
    });
  },

  /**
   * Returns the view of Shipping Address for Guest.
   * If the client is not logged in has selected 'guest' account option
   *
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  getGuestShippingAddressView: function getGuestShippingAddressView(callback) {
    var that = this;
    $.ajax({
      url: 'index.php?route=checkout/guest_shipping',
      dataType: 'html',
      success: function success(html) {
        that.setting.$shipping_address_body.html(html);
        that.setting.$shipping_address_title.html('<a href="#collapse-shipping-address" data-toggle="collapse" data-parent="#accordion" class="accordion-toggle">' + that.setting.text_checkout_shipping_address + ' <i class="fa fa-caret-down"></i></a>');
        if (typeof callback == "function") callback();
      },
      error: function error(xhr, ajaxOptions, thrownError) {
        that.errorHandler(xhr, ajaxOptions, thrownError);
      }
    });
  },

  /**
   * Returns the view of Shipping Method.
   *
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  getShippingMethodView: function getShippingMethodView(callback) {
    var that = this;
    $.ajax({
      url: 'index.php?route=checkout/shipping_method',
      dataType: 'html',
      success: function success(html) {
        that.setting.$shipping_method_body.html(html);
        that.setting.$shipping_method_title.html('<a href="#collapse-shipping-method" data-toggle="collapse" data-parent="#accordion" class="accordion-toggle">' + that.setting.text_checkout_shipping_method + ' <i class="fa fa-caret-down"></i></a>');
        if (typeof callback == "function") callback();
      },
      error: function error(xhr, ajaxOptions, thrownError) {
        that.errorHandler(xhr, ajaxOptions, thrownError);
      }
    });
  },

  /**
   * Returns the view of Payment Method.
   *
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  getPaymentMethodView: function getPaymentMethodView(callback) {
    var that = this;
    $.ajax({
      url: 'index.php?route=checkout/payment_method',
      dataType: 'html',
      success: function success(html) {
        that.setting.$payment_method_body.html(html);
        that.setting.$payment_method_title.html('<a href="#collapse-payment-method" data-toggle="collapse" data-parent="#accordion" class="accordion-toggle">' + that.setting.text_checkout_payment_method + ' <i class="fa fa-caret-down"></i></a>');
        if (typeof callback == "function") callback();
      },
      error: function error(xhr, ajaxOptions, thrownError) {
        that.errorHandler(xhr, ajaxOptions, thrownError);
      }
    });
  },

  /**
   * Returns the view of Confirm.
   *
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  getConfirmView: function getConfirmView(callback) {
    var that = this;
    $.ajax({
      url: 'index.php?route=checkout/confirm',
      dataType: 'html',
      complete: function complete() {
        $('#button-payment-method').button('reset');
      },
      success: function success(html) {
        that.setting.$confirm_body.html(html);
        that.setting.$confirm_title.html('<a href="#collapse-checkout-confirm" data-toggle="collapse" data-parent="#accordion" class="accordion-toggle">' + that.setting.text_checkout_confirm + ' <i class="fa fa-caret-down"></i></a>');
        if (typeof callback == "function") callback();
      },
      error: function error(xhr, ajaxOptions, thrownError) {
        that.errorHandler(xhr, ajaxOptions, thrownError);
      }
    });
  },

  /**
   *
   *
   *        CLICKS
   *
   *
   */

  /**
   * Ajax request for saving the login values and validating them.
   *
   * @return {[type]} [description]
   */
  clickLogin: function clickLogin() {
    var that = this;
    $.ajax({
      url: 'index.php?route=checkout/login/save',
      type: 'post',
      data: $('#collapse-checkout-option :input'),
      dataType: 'json',
      beforeSend: function beforeSend() {
        $('#button-login').button('loading');
      },
      complete: function complete() {
        $('#button-login').button('reset');
      },
      success: function success(json) {
        $('.alert, .text-danger').remove();
        $('.form-group').removeClass('has-error');

        if (json['redirect']) {
          location = json['redirect'];
        } else if (json['error']) {
          that.setting.$confirm_body.prepend('<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> ' + json['error']['warning'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>'); // Highlight any found errors

          $('input[name=\'email\']').parent().addClass('has-error');
          $('input[name=\'password\']').parent().addClass('has-error');
        }
      },
      error: function error(xhr, ajaxOptions, thrownError) {
        that.errorHandler(xhr, ajaxOptions, thrownError);
      }
    });
  },

  /**
   * Ajax request for saving register values and validating them.
   * Only if the customer is not logged in and
   * selected 'register' as account option.
   *
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  clickRegister: function clickRegister(callback) {
    var that = this;
    $.ajax({
      url: 'index.php?route=checkout/register/save',
      type: 'post',
      data: $('#collapse-payment-address input[type=\'text\'], #collapse-payment-address input[type=\'date\'], #collapse-payment-address input[type=\'datetime-local\'], #collapse-payment-address input[type=\'time\'], #collapse-payment-address input[type=\'password\'], #collapse-payment-address input[type=\'hidden\'], #collapse-payment-address input[type=\'email\'], #collapse-payment-address input[type=\'checkbox\']:checked, #collapse-payment-address input[type=\'radio\']:checked, #collapse-payment-address textarea, #collapse-payment-address select'),
      dataType: 'json',
      beforeSend: function beforeSend() {
        $('#button-register').button('loading');
      },
      complete: function complete() {
        $('#button-register').button('reset');
      },
      success: function success(json) {
        $('.alert, .text-danger').remove();
        $('.form-group').removeClass('has-error');

        if (json['redirect']) {
          location = json['redirect'];
        } else if (json['error']) {
          $('#button-register').button('reset');

          if (json['error']['warning']) {
            that.setting.$payment_address_body.prepend('<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> ' + json['error']['warning'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
          }

          for (var i in json['error']) {
            var element = that.setting.$payment_address.find('#input-' + i.replace('_', '-'));

            if ($(element).parent().hasClass('input-group')) {
              $(element).parent().after('<div class="text-danger">' + json['error'][i] + '</div>');
            } else {
              $(element).after('<div class="text-danger">' + json['error'][i] + '</div>');
            }
          } // Highlight any found errors


          $('.text-danger').parent().addClass('has-error');
        } else {
          if (typeof callback == "function") callback();
        }
      },
      error: function error(xhr, ajaxOptions, thrownError) {
        that.errorHandler(xhr, ajaxOptions, thrownError);
      }
    });
  },
  clickGuest: function clickGuest(callback) {
    var that = this;
    $.ajax({
      url: 'index.php?route=checkout/guest/save',
      type: 'post',
      data: $('#collapse-payment-address input[type=\'text\'], #collapse-payment-address input[type=\'date\'], #collapse-payment-address input[type=\'datetime-local\'], #collapse-payment-address input[type=\'time\'], #collapse-payment-address input[type=\'password\'], #collapse-payment-address input[type=\'hidden\'],#collapse-payment-address input[type=\'email\'], #collapse-payment-address input[type=\'checkbox\']:checked, #collapse-payment-address input[type=\'radio\']:checked, #collapse-payment-address textarea, #collapse-payment-address select'),
      dataType: 'json',
      beforeSend: function beforeSend() {
        $('#button-guest').button('loading');
      },
      complete: function complete() {
        $('#button-guest').button('reset');
      },
      success: function success(json) {
        $('.alert, .text-danger').remove();
        $('.form-group').removeClass('has-error');

        if (json['redirect']) {
          location = json['redirect'];
        } else if (json['error']) {
          $('#button-guest').button('reset');

          if (json['error']['warning']) {
            that.setting.$payment_address_body.prepend('<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> ' + json['error']['warning'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
          }

          for (var i in json['error']) {
            var element = that.setting.$payment_address.find('#input-' + i.replace('_', '-'));

            if ($(element).parent().hasClass('input-group')) {
              $(element).parent().after('<div class="text-danger">' + json['error'][i] + '</div>');
            } else {
              $(element).after('<div class="text-danger">' + json['error'][i] + '</div>');
            }
          } // Highlight any found errors


          $('.text-danger').parent().addClass('has-error');
        } else {
          if (typeof callback == "function") callback();
        }
      },
      error: function error(xhr, ajaxOptions, thrownError) {
        that.errorHandler(xhr, ajaxOptions, thrownError);
      }
    });
  },
  clickPaymentAddress: function clickPaymentAddress(callback) {
    var that = this;
    $.ajax({
      url: 'index.php?route=checkout/payment_address/save',
      type: 'post',
      data: $('#collapse-payment-address input[type=\'text\'], #collapse-payment-address input[type=\'date\'], #collapse-payment-address input[type=\'datetime-local\'], #collapse-payment-address input[type=\'time\'], #collapse-payment-address input[type=\'password\'], #collapse-payment-address input[type=\'checkbox\']:checked, #collapse-payment-address input[type=\'radio\']:checked, #collapse-payment-address input[type=\'hidden\'], #collapse-payment-address textarea, #collapse-payment-address select'),
      dataType: 'json',
      beforeSend: function beforeSend() {
        $('#button-payment-address').button('loading');
      },
      complete: function complete() {
        $('#button-payment-address').button('reset');
      },
      success: function success(json) {
        $('.alert, .text-danger').remove();

        if (json['redirect']) {
          location = json['redirect'];
        } else if (json['error']) {
          if (json['error']['warning']) {
            $('#collapse-payment-address .panel-body').prepend('<div class="alert alert-warning">' + json['error']['warning'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
          }

          for (var i in json['error']) {
            var element = that.setting.$payment_address.find('#input-' + i.replace('_', '-'));

            if ($(element).parent().hasClass('input-group')) {
              $(element).parent().after('<div class="text-danger">' + json['error'][i] + '</div>');
            } else {
              $(element).after('<div class="text-danger">' + json['error'][i] + '</div>');
            }
          } // Highlight any found errors


          $('.text-danger').parent().parent().addClass('has-error');
        } else {
          if (typeof callback == "function") callback();
        }
      },
      error: function error(xhr, ajaxOptions, thrownError) {
        that.errorHandler(xhr, ajaxOptions, thrownError);
      }
    });
  },
  clickShippingAddress: function clickShippingAddress(callback) {
    var that = this;
    $.ajax({
      url: 'index.php?route=checkout/shipping_address/save',
      type: 'post',
      data: $('#collapse-shipping-address input[type=\'text\'], #collapse-shipping-address input[type=\'date\'], #collapse-shipping-address input[type=\'datetime-local\'], #collapse-shipping-address input[type=\'time\'], #collapse-shipping-address input[type=\'password\'], #collapse-shipping-address input[type=\'checkbox\']:checked, #collapse-shipping-address input[type=\'radio\']:checked, #collapse-shipping-address textarea, #collapse-shipping-address select'),
      dataType: 'json',
      beforeSend: function beforeSend() {
        $('#button-shipping-address').button('loading');
      },
      complete: function complete() {
        $('#button-shipping-address').button('reset');
      },
      success: function success(json) {
        $('.alert, .text-danger').remove();

        if (json['redirect']) {
          location = json['redirect'];
        } else if (json['error']) {
          $('#button-shipping-address').button('reset');

          if (json['error']['warning']) {
            that.setting.$shipping_address_body.prepend('<div class="alert alert-warning">' + json['error']['warning'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
          }

          for (var i in json['error']) {
            var element = that.setting.$shipping_address.find('#input-' + i.replace('_', '-'));

            if ($(element).parent().hasClass('input-group')) {
              $(element).parent().after('<div class="text-danger">' + json['error'][i] + '</div>');
            } else {
              $(element).after('<div class="text-danger">' + json['error'][i] + '</div>');
            }
          } // Highlight any found errors


          $('.text-danger').parent().parent().addClass('has-error');
        } else {
          if (typeof callback == "function") callback();
        }
      },
      error: function error(xhr, ajaxOptions, thrownError) {
        that.errorHandler(xhr, ajaxOptions, thrownError);
      }
    });
  },
  clickGuestShippingAddress: function clickGuestShippingAddress(callback) {
    var that = this;
    $.ajax({
      url: 'index.php?route=checkout/guest_shipping/save',
      type: 'post',
      data: $('#collapse-shipping-address input[type=\'text\'], #collapse-shipping-address input[type=\'date\'], #collapse-shipping-address input[type=\'datetime-local\'], #collapse-shipping-address input[type=\'time\'], #collapse-shipping-address input[type=\'password\'], #collapse-shipping-address input[type=\'checkbox\']:checked, #collapse-shipping-address input[type=\'radio\']:checked, #collapse-shipping-address textarea, #collapse-shipping-address select'),
      dataType: 'json',
      beforeSend: function beforeSend() {
        $('#button-guest-shipping').button('loading');
      },
      complete: function complete() {
        $('#button-guest-shipping').button('reset');
      },
      success: function success(json) {
        $('.alert, .text-danger').remove();

        if (json['redirect']) {
          location = json['redirect'];
        } else if (json['error']) {
          $('#button-guest-shipping').button('reset');

          if (json['error']['warning']) {
            that.setting.$shipping_address_body.prepend('<div class="alert alert-warning">' + json['error']['warning'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
          }

          for (var i in json['error']) {
            var element = that.setting.$shipping_address.find('#input-' + i.replace('_', '-'));

            if ($(element).parent().hasClass('input-group')) {
              $(element).parent().after('<div class="text-danger">' + json['error'][i] + '</div>');
            } else {
              $(element).after('<div class="text-danger">' + json['error'][i] + '</div>');
            }
          } // Highlight any found errors


          $('.text-danger').parent().addClass('has-error');
        } else {
          if (typeof callback == "function") callback();
        }
      },
      error: function error(xhr, ajaxOptions, thrownError) {
        that.errorHandler(xhr, ajaxOptions, thrownError);
      }
    });
  },
  clickShippingMethod: function clickShippingMethod(callback) {
    var that = this;
    $.ajax({
      url: 'index.php?route=checkout/shipping_method/save',
      type: 'post',
      data: $('#collapse-shipping-method input[type=\'radio\']:checked, #collapse-shipping-method textarea'),
      dataType: 'json',
      beforeSend: function beforeSend() {
        $('#button-shipping-method').button('loading');
      },
      complete: function complete() {
        $('#button-shipping-method').button('reset');
      },
      success: function success(json) {
        $('.alert, .text-danger').remove();

        if (json['redirect']) {
          location = json['redirect'];
        } else if (json['error']) {
          $('#button-shipping-method').button('reset');

          if (json['error']['warning']) {
            that.setting.$shipping_address.prepend('<div class="alert alert-warning">' + json['error']['warning'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
          }
        } else {
          if (typeof callback == "function") callback();
        }
      },
      error: function error(xhr, ajaxOptions, thrownError) {
        that.errorHandler(xhr, ajaxOptions, thrownError);
      }
    });
  },
  clickPaymentMethod: function clickPaymentMethod(callback) {
    var that = this;
    $.ajax({
      url: 'index.php?route=checkout/payment_method/save',
      type: 'post',
      data: $('#collapse-payment-method input[type=\'radio\']:checked, #collapse-payment-method input[type=\'checkbox\']:checked, #collapse-payment-method textarea'),
      dataType: 'json',
      beforeSend: function beforeSend() {
        $('#button-payment-method').button('loading');
      },
      complete: function complete() {
        $('#button-payment-method').button('reset');
      },
      success: function success(json) {
        $('.alert, .text-danger').remove();

        if (json['redirect']) {
          location = json['redirect'];
        } else if (json['error']) {
          if (json['error']['warning']) {
            that.setting.$payment_method_body.prepend('<div class="alert alert-warning">' + json['error']['warning'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
          }
        } else {
          if (typeof callback == "function") callback();
        }
      },
      error: function error(xhr, ajaxOptions, thrownError) {
        that.errorHandler(xhr, ajaxOptions, thrownError);
      }
    });
  },
  render: function render() {
    var that = this;

    if (this.setting.account != 'logged') {
      this.getLoginView(function () {
        that.setAccount();
        that.changeStep('account');
      });
    } else {
      this.getPaymentAddressView(function () {
        that.changeStep('payment_address');
      });
    }

    $(document).on('change', 'input[name=\'account\']', function () {
      that.changeAccount();
    }); //account

    $(document).on('click', '#button-account', function () {
      if (that.setting.account == 'register') {
        that.getRegisterView(function () {
          that.changeStep('payment_address');
        });
      } else {
        that.getGuestView(function () {
          that.changeStep('payment_address');
        });
      }
    }); //login

    $(document).on('click', '#button-login', function () {
      that.clickLogin();
    }); //register

    $(document).on('click', '#button-register', function () {
      that.clickRegister(function () {
        if (that.setting.shipping_required) {
          var shipping_address = that.setting.$payment_address.find('input[name=\'shipping_address\']:checked').prop('value');

          if (shipping_address) {
            that.getShippingMethodView(function () {
              that.getShippingAddressView(function () {
                that.changeStep('shipping_method');
              });
            });
          } else {
            that.getShippingAddressView(function () {
              that.changeStep('shipping_address');
            });
          }
        } else {
          that.getPaymentMethodView(function () {
            that.changeStep('payment_method');
          });
        }

        that.getPaymentAddressView();
      });
    }); //payment_address

    $(document).on('click', '#button-payment-address', function () {
      that.clickPaymentAddress(function () {
        if (that.setting.shipping_required) {
          that.getShippingAddressView(function () {
            that.changeStep('shipping_address');
          });
        } else {
          that.getPaymentMethodView(function () {
            that.changeStep('payment_method');
          });
        }

        that.getPaymentAddressView();
      });
    }); //shipping_address

    $(document).on('click', '#button-shipping-address', function () {
      that.clickShippingAddress(function () {
        that.getShippingMethodView(function () {
          that.changeStep('shipping_method');
          that.getShippingAddressView();
        });
      });
    }); //guest

    $(document).on('click', '#button-guest', function () {
      that.clickGuest(function () {
        if (that.setting.shipping_required) {
          var shipping_address = that.setting.$payment_address.find('input[name=\'shipping_address\']:checked').prop('value');
          console.log('shipping_address:' + shipping_address);

          if (shipping_address) {
            that.getShippingMethodView(function () {
              that.getGuestShippingAddressView(function () {
                that.changeStep('shipping_method');
              });
            });
          } else {
            that.getGuestShippingAddressView(function () {
              that.changeStep('shipping_address');
            });
          }
        } else {
          that.getPaymentMethodView(function () {
            that.changeStep('payment_method');
          });
        }
      });
    }); //guest_shipping_address

    $(document).on('click', '#button-guest-shipping', function () {
      that.clickGuestShippingAddress(function () {
        that.getShippingMethodView(function () {
          that.changeStep('shipping_method');
        });
      });
    }); //shipping_method

    $(document).on('click', '#button-shipping-method', function () {
      that.clickShippingMethod(function () {
        that.getPaymentMethodView(function () {
          that.changeStep('payment_method');
        });
      });
    }); //payment_method

    $(document).on('click', '#button-payment-method', function () {
      that.clickPaymentMethod(function () {
        that.getConfirmView(function () {
          that.changeStep('confirm');
        });
      });
    });
  }
};
var d_address_field = {
  setting: {
    zone_id: 0,
    text_none: '',
    text_select: ''
  },
  init: function init(setting) {
    console.log('start d_address_field');
    this.setting = $.extend({}, this.setting, setting);
    this.render();
  },
  changeCountry: function changeCountry(country) {
    var setting = this.setting;
    $.ajax({
      url: 'index.php?route=account/account/country&country_id=' + country.value,
      dataType: 'json',
      beforeSend: function beforeSend() {
        $('select[name=\'country_id\']').after(' <i class="fa fa-circle-o-notch fa-spin"></i>');
      },
      complete: function complete() {
        $('.fa-spin').remove();
      },
      success: function success(json) {
        if (json['postcode_required'] == '1') {
          $('input[name=\'postcode\']').parent().parent().addClass('required');
        } else {
          $('input[name=\'postcode\']').parent().parent().removeClass('required');
        }

        var html = '<option value="">' + setting.text_select + '</option>';

        if (json['zone'] && json['zone'] != '') {
          for (var i = 0; i < json['zone'].length; i++) {
            html += '<option value="' + json['zone'][i]['zone_id'] + '"';

            if (json['zone'][i]['zone_id'] == setting.zone_id) {
              html += ' selected="selected"';
            }

            html += '>' + json['zone'][i]['name'] + '</option>';
          }
        } else {
          html += '<option value="0" selected="selected">' + setting.text_none + '</option>';
        }

        $('select[name=\'zone_id\']').html(html);
      },
      error: function error(xhr, ajaxOptions, thrownError) {
        alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
      }
    });
  },
  render: function render() {
    var that = this;
    $('select[name=\'country_id\']').on('change', function () {
      that.changeCountry(this);
    });
    $('select[name=\'country_id\']').trigger('change');
  }
};
var d_custom_field = {
  init: function init() {
    console.log('start d_custom_field');
    this.render();
  },
  changeCustomerGroup: function changeCustomerGroup(customer_group) {
    $.ajax({
      url: 'index.php?route=account/register/customfield&customer_group_id=' + customer_group.value,
      dataType: 'json',
      success: function success(json) {
        $('.custom-field').hide();
        $('.custom-field').removeClass('required');

        for (var i = 0; i < json.length; i++) {
          custom_field = json[i];
          $('#custom-field' + custom_field['custom_field_id']).show();

          if (custom_field['required']) {
            $('#custom-field' + custom_field['custom_field_id']).addClass('required');
          }
        }
      },
      error: function error(xhr, ajaxOptions, thrownError) {
        alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
      }
    });
  },
  upload: function upload(node) {
    $('#form-upload').remove();
    $('body').prepend('<form enctype="multipart/form-data" id="form-upload" style="display: none;"><input type="file" name="file" /></form>');
    $('#form-upload input[name=\'file\']').trigger('click');

    if (typeof timer != 'undefined') {
      clearInterval(timer);
    }

    timer = setInterval(function () {
      if ($('#form-upload input[name=\'file\']').val() != '') {
        clearInterval(timer);
        $.ajax({
          url: 'index.php?route=tool/upload',
          type: 'post',
          dataType: 'json',
          data: new FormData($('#form-upload')[0]),
          cache: false,
          contentType: false,
          processData: false,
          beforeSend: function beforeSend() {
            $(node).button('loading');
          },
          complete: function complete() {
            $(node).button('reset');
          },
          success: function success(json) {
            $(node).parent().find('.text-danger').remove();

            if (json['error']) {
              $(node).parent().find('input').after('<div class="text-danger">' + json['error'] + '</div>');
            }

            if (json['success']) {
              alert(json['success']);
              $(node).parent().find('input').attr('value', json['code']);
            }
          },
          error: function error(xhr, ajaxOptions, thrownError) {
            alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
          }
        });
      }
    }, 500);
  },
  sort: function sort() {
    $('fieldset').each(function () {
      var $this = $(this);
      console.log('sorting:' + $this.attr('id'));
      $this.find('.form-group[data-sort]').detach().each(function () {
        if ($(this).attr('data-sort') >= 0 && $(this).attr('data-sort') <= $('.form-group').length) {
          $this.find('.form-group').eq($(this).attr('data-sort')).before(this);
        }

        if ($(this).attr('data-sort') > $('.form-group').length) {
          $this.find('.form-group:last').after(this);
        }

        if ($(this).attr('data-sort') < -$('.form-group').length) {
          $this.find('.form-group:first').before(this);
        }
      });
    });
  },
  render: function render() {
    var that = this;
    that.sort();
    $(document).on('change', 'input[name=\'customer_group_id\']', function () {
      that.changeCustomerGroup(this);
    });
    $('input[name=\'customer_group_id\']:checked').trigger('change');
    $(document).on('click', 'button[id^=\'button-custom-field\']', function () {
      that.upload(this);
    });
    var fontawesome_icons = {
      time: 'fa fa-clock',
      date: 'fa fa-calendar',
      up: 'fa fa-chevron-up',
      down: 'fa fa-chevron-down',
      previous: 'fa fa-chevron-left',
      next: 'fa fa-chevron-right',
      today: 'fa fa-chevron-down',
      clear: 'fa fa-times',
      close: 'fa fa-time'
    };
    $('.date').datetimepicker({
      pickTime: false,
      icons: fontawesome_icons
    });
    $('.datetime').datetimepicker({
      pickDate: true,
      pickTime: true,
      icons: fontawesome_icons
    });
    $('.time').datetimepicker({
      pickDate: false,
      icons: fontawesome_icons
    });
  }
};
$(document).ready(function () {
  // Product List
  console.log('start d_product_sort');
  $(document).on('click', '#list-view', function () {
    $(document).trigger('list-view');
  }); // Product Grid

  $(document).on('click', '#grid-view', function () {
    $(document).trigger('grid-view');
  });

  if (localStorage.getItem('display') == 'list') {
    $('#list-view').trigger('click');
  } else {
    $('#grid-view').trigger('click');
  }
});
var cart = {
  'add': function add(product_id, quantity) {
    $.ajax({
      url: 'index.php?route=checkout/cart/add',
      type: 'post',
      data: 'product_id=' + product_id + '&quantity=' + (typeof quantity != 'undefined' ? quantity : 1),
      dataType: 'json',
      beforeSend: function beforeSend() {
        $('#cart > button').button('loading');
      },
      complete: function complete() {
        $('#cart > button').button('reset');
      },
      success: function success(json) {
        $('.alert, .text-danger').remove();

        if (json['redirect']) {
          location = json['redirect'];
        }

        if (json['success']) {
          $('#content').parent().before('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>'); // Need to set timeout otherwise it wont update the total

          setTimeout(function () {
            $('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span>');
          }, 100);
          $('html, body').animate({
            scrollTop: 0
          }, 'slow');
          $('#cart').load('index.php?route=common/cart/info');
        }
      },
      error: function error(xhr, ajaxOptions, thrownError) {
        alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
      }
    });
  },
  'update': function update(key, quantity) {
    $.ajax({
      url: 'index.php?route=checkout/cart/edit',
      type: 'post',
      data: 'key=' + key + '&quantity=' + (typeof quantity != 'undefined' ? quantity : 1),
      dataType: 'json',
      beforeSend: function beforeSend() {
        $('#cart > button').button('loading');
      },
      complete: function complete() {
        $('#cart > button').button('reset');
      },
      success: function success(json) {
        // Need to set timeout otherwise it wont update the total
        setTimeout(function () {
          $('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span>');
        }, 100);

        if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
          location = 'index.php?route=checkout/cart';
        } else {
          $('#cart > ul').load('index.php?route=common/cart/info ul li');
        }
      },
      error: function error(xhr, ajaxOptions, thrownError) {
        alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
      }
    });
  },
  'remove': function remove(key) {
    $.ajax({
      url: 'index.php?route=checkout/cart/remove',
      type: 'post',
      data: 'key=' + key,
      dataType: 'json',
      beforeSend: function beforeSend() {
        $('#cart > button').button('loading');
      },
      complete: function complete() {
        $('#cart > button').button('reset');
      },
      success: function success(json) {
        // Need to set timeout otherwise it wont update the total
        setTimeout(function () {
          $('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span>');
        }, 100);

        if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
          location = 'index.php?route=checkout/cart';
        } else {
          $('#cart > ul').load('index.php?route=common/cart/info ul li');
        }
      },
      error: function error(xhr, ajaxOptions, thrownError) {
        alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
      }
    });
  },
  'increaseQuantity': function increaseQuantity(product_id) {
    $('.input-quantity-' + product_id).val(+$('.input-quantity-' + product_id).val() + 1);
    $(document).trigger('cart/increaseQuantity', {
      product_id: product_id,
      quantity: +$('.input-quantity-' + product_id).val()
    });
  },
  'decreaseQuantity': function decreaseQuantity(product_id, minimum) {
    var $quantity = $('.input-quantity-' + product_id);

    if ($quantity.val() <= minimum) {
      $quantity.val(minimum);
    } else {
      $quantity.val(parseInt($quantity.val()) - 1);
    }

    $(document).trigger('cart/decreaseQuantity', {
      product_id: product_id,
      quantity: +$('.input-quantity-' + product_id).val()
    });
  }
};

cart.add = function (product_id, quantity) {
  d_visual_designer.dispatch('product/cart/add', {
    product_data: {
      product_id: product_id,
      quantity: typeof quantity != 'undefined' ? quantity : 1
    },
    callback: function callback(json) {
      d_notification.dispatch('product/cart/add', json);

      if (json['error']) {
        console.log(json['error']);

        if (json['redirect']) {
          setTimeout(function () {
            location = json['redirect'];
          }, 200);
        }
      } // $('.vd-cart-btn').parent().addClass('open');


      $('html, body').animate({
        scrollTop: 0
      }, 'slow');
    },
    beforeSend: function beforeSend() {
      $('#cart .dropdown-menu').addClass('backdrop');
    },
    complete: function complete() {
      $('#cart .dropdown-menu').removeClass('backdrop');
    }
  });
};

cart.remove = function (key) {
  d_visual_designer.dispatch('product/cart/remove', {
    product_data: {
      key: key
    },
    beforeSend: function beforeSend() {
      $('#cart .dropdown-menu').addClass('backdrop');
    },
    callback: function callback() {
      $('#cart .dropdown-menu').removeClass('backdrop');
      $(document).trigger('cart/remove', {
        product_id: key
      });
    }
  });
};

cart.update = function (key, quantity) {
  d_visual_designer.dispatch('product/cart/update', {
    product_data: {
      key: key,
      quantity: quantity != 'undefined' ? quantity : 1
    },
    beforeSend: function beforeSend() {
      $('#cart .dropdown-menu').addClass('backdrop');
    },
    complete: function complete() {
      $('#cart .dropdown-menu').removeClass('backdrop');
    }
  });
};

$(document).on('cart/increaseQuantity', function (action, data) {
  cart.update(data.product_id, data.quantity);
});
$(document).on('cart/decreaseQuantity', function (action, data) {
  cart.update(data.product_id, data.quantity);
});
$(document).ready(function () {
  // Highlight any found errors
  $('.text-danger').each(function () {
    var element = $(this).parent().parent();

    if (element.hasClass('form-group')) {
      element.addClass('has-error');
    }
  });
  /* Search */

  $('#search input[name=\'search\']').parent().find('button').on('click', function () {
    var url = $('base').attr('href') + 'index.php?route=product/search';
    var value = $('header #search input[name=\'search\']').val();

    if (value) {
      url += '&search=' + encodeURIComponent(value);
    }

    location = url;
  });
  $('#search input[name=\'search\']').on('keydown', function (e) {
    if (e.keyCode == 13) {
      $('header #search input[name=\'search\']').parent().find('button').trigger('click');
    }
  }); // Menu

  if (localStorage.getItem('display') == 'list') {
    $('#list-view').trigger('click');
    $('#list-view').addClass('active');
  } else {
    $('#grid-view').trigger('click');
    $('#grid-view').addClass('active');
  } // Checkout


  $(document).on('keydown', '#collapse-checkout-option input[name=\'email\'], #collapse-checkout-option input[name=\'password\']', function (e) {
    if (e.keyCode == 13) {
      $('#collapse-checkout-option #button-login').trigger('click');
    }
  }); // tooltips on hover

  $('[data-toggle=\'tooltip\']').tooltip({
    container: 'body'
  }); // Makes tooltips work on ajax generated content

  $(document).ajaxStop(function () {
    $('[data-toggle=\'tooltip\']').tooltip({
      container: 'body'
    });
  });

  if (typeof $.rating == 'function') {
    $('input[name=\'rating\']').rating();
  }
}); // Autocomplete */

(function ($) {
  $.fn.autocomplete = function (option) {
    return this.each(function () {
      this.timer = null;
      this.items = new Array();
      $.extend(this, option);
      $(this).attr('autocomplete', 'off'); // Focus

      $(this).on('focus', function () {
        this.request();
      }); // Blur

      $(this).on('blur', function () {
        setTimeout(function (object) {
          object.hide();
        }, 200, this);
      }); // Keydown

      $(this).on('keydown', function (event) {
        switch (event.keyCode) {
          case 27:
            // escape
            this.hide();
            break;

          default:
            this.request();
            break;
        }
      }); // Click

      this.click = function (event) {
        event.preventDefault();
        value = $(event.target).parent().attr('data-value');

        if (value && this.items[value]) {
          this.select(this.items[value]);
        }
      }; // Show


      this.show = function () {
        var pos = $(this).position();
        $(this).siblings('ul.dropdown-menu').css({
          top: pos.top + $(this).outerHeight(),
          left: pos.left
        });
        $(this).siblings('ul.dropdown-menu').show();
      }; // Hide


      this.hide = function () {
        $(this).siblings('ul.dropdown-menu').hide();
      }; // Request


      this.request = function () {
        clearTimeout(this.timer);
        this.timer = setTimeout(function (object) {
          object.source($(object).val(), $.proxy(object.response, object));
        }, 200, this);
      }; // Response


      this.response = function (json) {
        var html = '';

        if (json.length) {
          for (var i = 0; i < json.length; i++) {
            this.items[json[i]['value']] = json[i];
          }

          for (var i = 0; i < json.length; i++) {
            if (!json[i]['category']) {
              html += '<li data-value="' + json[i]['value'] + '"><a href="#">' + json[i]['label'] + '</a></li>';
            }
          } // Get all the ones with a categories


          var category = new Array();

          for (var i = 0; i < json.length; i++) {
            if (json[i]['category']) {
              if (!category[json[i]['category']]) {
                category[json[i]['category']] = new Array();
                category[json[i]['category']]['name'] = json[i]['category'];
                category[json[i]['category']]['item'] = new Array();
              }

              category[json[i]['category']]['item'].push(json[i]);
            }
          }

          for (var i in category) {
            html += '<li class="dropdown-header">' + category[i]['name'] + '</li>';

            for (var j = 0; j < category[i]['item'].length; j++) {
              html += '<li data-value="' + category[i]['item'][j]['value'] + '"><a href="#">&nbsp;&nbsp;&nbsp;' + category[i]['item'][j]['label'] + '</a></li>';
            }
          }
        }

        if (html) {
          this.show();
        } else {
          this.hide();
        }

        $(this).siblings('ul.dropdown-menu').html(html);
      };

      $(this).after('<ul class="dropdown-menu"></ul>');
      $(this).siblings('ul.dropdown-menu').delegate('a', 'click', $.proxy(this.click, this));
    });
  };
})(window.jQuery);

var compare = {
  'add': function add(product_id) {
    $.ajax({
      url: 'index.php?route=product/compare/add',
      type: 'post',
      data: 'product_id=' + product_id,
      dataType: 'json',
      success: function success(json) {
        $('.alert').remove();

        if (json['success']) {
          $('#content').parent().before('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
          $('#compare-total').html(json['total']);
          $('html, body').animate({
            scrollTop: 0
          }, 'slow');
        }
      },
      error: function error(xhr, ajaxOptions, thrownError) {
        alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
      }
    });
  },
  'remove': function remove() {}
};
var d_notification = new component();
(function () {
  this.subscribe('product/cart/add', function (e, json) {
    $('.alert-dismissible, .text-danger').remove();

    if (json['success']) {
      $('#content').parent().before('<div class="alert alert-success alert-dismissible"><i class="fas fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert" style="right: 0;">&times;</button></div>');
    }
  }.bind(this));
}).bind(d_notification)();
var voucher = {
  'add': function add() {},
  'remove': function remove(key) {
    $.ajax({
      url: 'index.php?route=checkout/cart/remove',
      type: 'post',
      data: 'key=' + key,
      dataType: 'json',
      beforeSend: function beforeSend() {
        $('#cart > button').button('loading');
      },
      complete: function complete() {
        $('#cart > button').button('reset');
      },
      success: function success(json) {
        // Need to set timeout otherwise it wont update the total
        setTimeout(function () {
          $('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span>');
        }, 100);

        if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
          location = 'index.php?route=checkout/cart';
        } else {
          $('#cart > ul').load('index.php?route=common/cart/info ul li');
        }
      },
      error: function error(xhr, ajaxOptions, thrownError) {
        alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
      }
    });
  }
};
var wishlist = {
  'add': function add(product_id) {
    $.ajax({
      url: 'index.php?route=account/wishlist/add',
      type: 'post',
      data: 'product_id=' + product_id,
      dataType: 'json',
      success: function success(json) {
        $('.alert').remove();

        if (json['redirect']) {
          location = json['redirect'];
        }

        if (json['success']) {
          $('#content').parent().before('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
        }

        $('#wishlist-total span').html(json['total']);
        $('#wishlist-total').attr('title', json['total']);
        $('html, body').animate({
          scrollTop: 0
        }, 'slow');
      },
      error: function error(xhr, ajaxOptions, thrownError) {
        alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
      }
    });
  },
  'remove': function remove() {}
};
var Product = {
  setting: {
    product_id: '',
    $quantity: '',
    minimum: ''
  },
  init: function init(setting) {
    console.log('start Product');
    this.setting = $.extend({}, this.setting, setting);
    this.render();
  },
  increaseQuantity: function increaseQuantity() {
    this.setting.$quantity.val(parseInt(this.setting.$quantity.val()) + 1);
  },
  decreaseQuantity: function decreaseQuantity() {
    if (this.setting.$quantity.val() <= this.setting.minimum) {
      this.setting.$quantity.val(this.setting.minimum);
    } else {
      this.setting.$quantity.val(parseInt(this.setting.$quantity.val()) - 1);
    }
  },
  updateRecurringDescription: function updateRecurringDescription() {
    $.ajax({
      url: 'index.php?route=product/product/getRecurringDescription',
      type: 'post',
      data: $('input[name=\'product_id\'], input[name=\'quantity\'], select[name=\'recurring_id\']'),
      dataType: 'json',
      beforeSend: function beforeSend() {
        $('#recurring-description').html('');
      },
      success: function success(json) {
        $('.alert, .text-danger').remove();

        if (json['success']) {
          $('#recurring-description').html(json['success']);
        }
      }
    });
  },
  addCart: function addCart() {
    d_visual_designer.dispatch('product/cart/add', {
      product_data: $('#product input[type=\'number\'], #product input[type=\'text\'], #product input[type=\'hidden\'], #product input[type=\'radio\']:checked, #product input[type=\'checkbox\']:checked, #product select, #product textarea'),
      callback: function callback(json) {
        d_notification.dispatch('product/cart/add', json);
        $('.alert, .text-danger').remove();
        $('.form-group').removeClass('has-error');

        if (json['error']) {
          if (json['error']['option']) {
            for (var i in json['error']['option']) {
              var element = $('#input-option' + i.replace('_', '-'));

              if (element.parent().hasClass('input-group')) {
                element.parent().after('<div class="text-danger">' + json['error']['option'][i] + '</div>');
              } else {
                element.after('<div class="text-danger">' + json['error']['option'][i] + '</div>');
              }
            }
          }

          if (json['error']['recurring']) {
            $('select[name=\'recurring_id\']').after('<div class="text-danger">' + json['error']['recurring'] + '</div>');
          } // Highlight any found errors


          $('.text-danger').parent().addClass('has-error');
        }

        $('html, body').animate({
          scrollTop: 0
        }, 'slow');
      }
    });
    ;
  },
  uploadFile: function uploadFile(node) {
    $('#form-upload').remove();
    $('body').prepend('<form enctype="multipart/form-data" id="form-upload" style="display: none;"><input type="file" name="file" /></form>');
    $('#form-upload input[name=\'file\']').trigger('click');

    if (typeof timer != 'undefined') {
      clearInterval(timer);
    }

    var timer = setInterval(function () {
      if ($('#form-upload input[name=\'file\']').val() != '') {
        clearInterval(timer);
        $.ajax({
          url: 'index.php?route=tool/upload',
          type: 'post',
          dataType: 'json',
          data: new FormData($('#form-upload')[0]),
          cache: false,
          contentType: false,
          processData: false,
          beforeSend: function beforeSend() {
            $(node).button('loading');
          },
          complete: function complete() {
            $(node).button('reset');
          },
          success: function success(json) {
            $('.text-danger').remove();

            if (json['error']) {
              $(node).parent().find('input').after('<div class="text-danger">' + json['error'] + '</div>');
            }

            if (json['success']) {
              alert(json['success']);
              $(node).parent().find('input').attr('value', json['code']);
            }
          },
          error: function error(xhr, ajaxOptions, thrownError) {
            alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
          }
        });
      }
    }, 500);
  },
  loadReviewPage: function loadReviewPage(node, e) {
    e.preventDefault();
    $('#review').fadeOut('slow');
    $('#review').load(node.href);
    $('#review').fadeIn('slow');
  },
  sendReview: function sendReview() {
    var that = this;
    $.ajax({
      url: 'index.php?route=product/product/write&product_id=' + that.setting.product_id,
      type: 'post',
      dataType: 'json',
      data: $("#form-review").serialize(),
      beforeSend: function beforeSend() {
        $('#button-review').button('loading');
      },
      complete: function complete() {
        $('#button-review').button('reset');
      },
      success: function success(json) {
        $('.alert-success, .alert-danger').remove();

        if (json['error']) {
          $('#review').after('<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> ' + json['error'] + '</div>');
        }

        if (json['success']) {
          $('#review').after('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + '</div>');
          $('input[name=\'name\']').val('');
          $('textarea[name=\'text\']').val('');
          $('input[name=\'rating\']:checked').prop('checked', false);
        }
      }
    });
  },
  render: function render() {
    var that = this;
    $(document).on('change', 'select[name=\'recurring_id\'], input[name="quantity"]', function () {
      that.updateRecurringDescription();
    });
    $(document).on('click', '#button-cart', function () {
      that.addCart();
    });
    $(document).on('click', 'button[id^=\'button-upload\']', function () {
      that.uploadFile(this);
    });
    $(document).on('click', '#review .pagination a', function (e) {
      that.loadReviewPage(this, e);
    });
    $(document).on('click', '#button-review', function () {
      that.sendReview();
    });
    $(document).on('click', '#quantity_control .decrease', function () {
      that.decreaseQuanityt();
    });
    $(document).on('click', '#quantity_control .increase', function () {
      that.increaseQuantity();
    });
    $('#review').load('index.php?route=product/product/review&product_id=' + that.setting.product_id);
    $('input[name=\'rating\']').rating();
    $('.date').datetimepicker({
      pickTime: false
    });
    $('.datetime').datetimepicker({
      pickDate: true,
      pickTime: true
    });
    var fontawesome_icons = {
      time: 'fa fa-clock',
      date: 'fa fa-calendar',
      up: 'fa fa-chevron-up',
      down: 'fa fa-chevron-down',
      previous: 'fa fa-chevron-left',
      next: 'fa fa-chevron-right',
      today: 'fa fa-chevron-down',
      clear: 'fa fa-times',
      close: 'fa fa-time'
    };
    $('.time').datetimepicker({
      pickDate: false,
      icons: fontawesome_icons
    });
    $('.vz-product-product__thumbnails__item').magnificPopup({
      type: 'image',
      delegate: 'a',
      gallery: {
        enabled: true
      }
    });
  }
};
var Search = {
  init: function init() {
    console.log('start Search');
    this.render();
  },
  clickSearch: function clickSearch() {
    url = 'index.php?route=product/search';
    var search = $('#content input[name=\'search\']').prop('value');

    if (search) {
      url += '&search=' + encodeURIComponent(search);
    }

    var category_id = $('#content select[name=\'category_id\']').prop('value');

    if (category_id > 0) {
      url += '&category_id=' + encodeURIComponent(category_id);
    }

    var sub_category = $('#content input[name=\'sub_category\']:checked').prop('value');

    if (sub_category) {
      url += '&sub_category=true';
    }

    var filter_description = $('#content input[name=\'description\']:checked').prop('value');

    if (filter_description) {
      url += '&description=true';
    }

    location = url;
  },
  render: function render() {
    var that = this;
    $(document).on('click', '#button-search', function () {
      that.clickSearch();
    });
    $(document).on('keydown', '#content input[name=\'search\']', function (e) {
      if (e.keyCode == 13) {
        $('#button-search').trigger('click');
      }
    });
    $(document).on('change', 'select[name=\'category_id\']', function () {
      if (this.value == '0') {
        $('input[name=\'sub_category\']').prop('disabled', true);
      } else {
        $('input[name=\'sub_category\']').prop('disabled', false);
      }
    });
    $('select[name=\'category_id\']').trigger('change');
  }
};

function takeScreenShot(opts, resolution) {
  if (typeof html2canvas == 'function') {
    html2canvas(document.body, opts).then(function (canvas) {
      //debug
      // $('body').append(canvas)
      var imgData = canvas.toDataURL('image/png');
      $.ajax({
        url: 'index.php?route=extension/d_visualize/event/saveScrenshot',
        type: 'post',
        dataType: 'text',
        data: {
          base64data: imgData,
          type: resolution
        }
      }).success(function (json) {
        console.log('success save screnshot at ');
      }).fail(function () {}).done(function () {});
    });
  }
}

$(document).ready(function () {
  setTimeout(function () {
    takeScreenShot({}, 'desktop');
  }, 100);
  setTimeout(function () {
    takeScreenShot({
      'logging': false,
      width: 350,
      windowWidth: 350,
      windowHeight: 605
    }, 'mobile');
  }, 200);
});
var Total_coupon = {
  init: function init() {
    console.log('start Total_coupon');
    this.render();
  },
  clickCoupon: function clickCoupon() {
    $.ajax({
      url: 'index.php?route=total/coupon/coupon',
      type: 'post',
      data: 'coupon=' + encodeURIComponent($('input[name=\'coupon\']').val()),
      dataType: 'json',
      beforeSend: function beforeSend() {
        $('#button-coupon').button('loading');
      },
      complete: function complete() {
        $('#button-coupon').button('reset');
      },
      success: function success(json) {
        $('.alert').remove();

        if (json['error']) {
          $('.breadcrumb').after('<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> ' + json['error'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
          $('html, body').animate({
            scrollTop: 0
          }, 'slow');
        }

        if (json['redirect']) {
          location = json['redirect'];
        }
      }
    });
  },
  render: function render() {
    var that = this;
    $(document).on('click', '#button-coupon', function () {
      that.clickCoupon();
    });
  }
};
var Total_reward = {
  init: function init() {
    console.log('start Total_reward');
    this.render();
  },
  clickReward: function clickReward() {
    $.ajax({
      url: 'index.php?route=total/reward/reward',
      type: 'post',
      data: 'reward=' + encodeURIComponent($('input[name=\'reward\']').val()),
      dataType: 'json',
      beforeSend: function beforeSend() {
        $('#button-reward').button('loading');
      },
      complete: function complete() {
        $('#button-reward').button('reset');
      },
      success: function success(json) {
        $('.alert').remove();

        if (json['error']) {
          $('.breadcrumb').after('<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> ' + json['error'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
          $('html, body').animate({
            scrollTop: 0
          }, 'slow');
        }

        if (json['redirect']) {
          location = json['redirect'];
        }
      }
    });
  },
  render: function render() {
    var that = this;
    $(document).on('click', '#button-reward', function () {
      that.clickReward();
    });
  }
};
var Total_shipping = {
  setting: {
    shipping_method: 'shipping_method',
    text_shipping_method: 'text_shipping_method',
    text_loading: 'text_loading',
    button_cancel: 'button_cancel',
    button_shipping: 'button_shipping'
  },
  init: function init(setting) {
    console.log('start Total_shipping');
    this.setting = $.extend({}, this.setting, setting);
    this.render();
  },
  clickQoute: function clickQoute() {
    var that = this;
    $.ajax({
      url: 'index.php?route=total/shipping/quote',
      type: 'post',
      data: 'country_id=' + $('select[name=\'country_id\']').val() + '&zone_id=' + $('select[name=\'zone_id\']').val() + '&postcode=' + encodeURIComponent($('input[name=\'postcode\']').val()),
      dataType: 'json',
      beforeSend: function beforeSend() {
        $('#button-quote').button('loading');
      },
      complete: function complete() {
        $('#button-quote').button('reset');
      },
      success: function success(json) {
        $('.alert, .text-danger').remove();

        if (json['error']) {
          if (json['error']['warning']) {
            $('.breadcrumb').after('<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> ' + json['error']['warning'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
            $('html, body').animate({
              scrollTop: 0
            }, 'slow');
          }

          if (json['error']['country']) {
            $('select[name=\'country_id\']').after('<div class="text-danger">' + json['error']['country'] + '</div>');
          }

          if (json['error']['zone']) {
            $('select[name=\'zone_id\']').after('<div class="text-danger">' + json['error']['zone'] + '</div>');
          }

          if (json['error']['postcode']) {
            $('input[name=\'postcode\']').after('<div class="text-danger">' + json['error']['postcode'] + '</div>');
          }
        }

        if (json['shipping_method']) {
          $('#modal-shipping').remove();
          html = '<div id="modal-shipping" class="modal">';
          html += '  <div class="modal-dialog">';
          html += '    <div class="modal-content">';
          html += '      <div class="modal-header">';
          html += '        <h4 class="modal-title">' + that.setting.text_shipping_method + '</h4>';
          html += '      </div>';
          html += '      <div class="modal-body">';

          for (var i in json['shipping_method']) {
            html += '<p><strong>' + json['shipping_method'][i]['title'] + '</strong></p>';

            if (!json['shipping_method'][i]['error']) {
              for (var j in json['shipping_method'][i]['quote']) {
                html += '<div class="radio">';
                html += '  <label>';

                if (json['shipping_method'][i]['quote'][j]['code'] == that.setting.shipping_method) {
                  html += '<input type="radio" name="shipping_method" value="' + json['shipping_method'][i]['quote'][j]['code'] + '" checked="checked" />';
                } else {
                  html += '<input type="radio" name="shipping_method" value="' + json['shipping_method'][i]['quote'][j]['code'] + '" />';
                }

                html += json['shipping_method'][i]['quote'][j]['title'] + ' - ' + json['shipping_method'][i]['quote'][j]['text'] + '</label></div>';
              }
            } else {
              html += '<div class="alert alert-danger">' + json['shipping_method'][i]['error'] + '</div>';
            }
          }

          html += '      </div>';
          html += '      <div class="modal-footer">';
          html += '        <button type="button" class="btn btn-default" data-dismiss="modal">' + that.setting.button_cancel + '</button>';

          if (that.setting.shipping_method) {
            html += '        <input type="button" value="' + that.setting.button_shipping + '" id="button-shipping" data-loading-text="' + that.setting.text_loading + '" class="btn btn-primary" />';
          } else {
            html += '        <input type="button" value="' + that.setting.button_shipping + '" id="button-shipping" data-loading-text="' + that.setting.text_loading + '" class="btn btn-primary" disabled="disabled" />';
          }

          html += '      </div>';
          html += '    </div>';
          html += '  </div>';
          html += '</div> ';
          $('body').append(html);
          $('#modal-shipping').modal('show');
          $('input[name=\'shipping_method\']').on('change', function () {
            $('#button-shipping').prop('disabled', false);
          });
        }
      }
    });
  },
  clickShipping: function clickShipping() {
    $.ajax({
      url: 'index.php?route=total/shipping/shipping',
      type: 'post',
      data: 'shipping_method=' + encodeURIComponent($('input[name=\'shipping_method\']:checked').val()),
      dataType: 'json',
      beforeSend: function beforeSend() {
        $('#button-shipping').button('loading');
      },
      complete: function complete() {
        $('#button-shipping').button('reset');
      },
      success: function success(json) {
        $('.alert').remove();

        if (json['error']) {
          $('.breadcrumb').after('<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> ' + json['error'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
          $('html, body').animate({
            scrollTop: 0
          }, 'slow');
        }

        if (json['redirect']) {
          location = json['redirect'];
        }
      }
    });
  },
  render: function render() {
    var that = this;
    $(document).on('click', '#button-quote', function () {
      that.clickQoute();
    });
    $(document).on('click', '#button-shipping', function () {
      that.clickShipping();
    });
  }
};
var Total_voucher = {
  init: function init() {
    console.log('start Total_voucher');
    this.render();
  },
  clickVoucher: function clickVoucher() {
    $.ajax({
      url: 'index.php?route=total/voucher/voucher',
      type: 'post',
      data: 'voucher=' + encodeURIComponent($('input[name=\'voucher\']').val()),
      dataType: 'json',
      beforeSend: function beforeSend() {
        $('#button-voucher').button('loading');
      },
      complete: function complete() {
        $('#button-voucher').button('reset');
      },
      success: function success(json) {
        $('.alert').remove();

        if (json['error']) {
          $('.breadcrumb').after('<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> ' + json['error'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
          $('html, body').animate({
            scrollTop: 0
          }, 'slow');
        }

        if (json['redirect']) {
          location = json['redirect'];
        }
      }
    });
  },
  render: function render() {
    var that = this;
    $(document).on('click', '#button-voucher', function () {
      that.clickVoucher();
    });
  }
};

function component() {
  this.dispatch = function (action, state) {
    $(document).trigger(action, state);
  };

  this.subscribe = function (action, callback) {
    $(document).on(action, callback);
  };
}