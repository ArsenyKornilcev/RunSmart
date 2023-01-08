$(document).ready(function(){
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.products').removeClass('products_active').eq($(this).index()).addClass('products_active');
    });

    function toggleSlide(item){
        $(item).each(function(i){
            $(this).on('click', function(e){
                e.preventDefault();
                $('.card__content').eq(i).toggleClass('card__content_active');
                $('.card__list').eq(i).toggleClass('card__list_active');
            })
        });
    }

    toggleSlide('.link-more');
    toggleSlide('.link-back');

    $('[data-modal=consult]').on('click', function(){
        $('.overlay, #consult').fadeIn('slow');
    });

    $('.btn_buy').each(function(i){
        $(this).on('click', function(){
            $('#order .mmodal__descr').text($('.label').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        }) 
    });

    $('.mmodal__close').on('click', function(){
        $('.overlay, #consult, #order, #notification').fadeOut('slow');
    });

    function valideForms(form){
        $(form).validate(
            {
                rules: {
                    name: 'required',
                    phone: 'required',
                    email: {
                        required: true,
                        email: true,
                    }
                },
                messages: {
                    name: 'Введите имя',
                    phone: 'Нормальный телефон, пожалуйста',
                    email: {
                        required: "Нормальную почту, пожалуйста",
                        email: "Некорректно",
                    }
                }
            }
        );
    }
    valideForms('.feed-form');
    valideForms('#consult form');
    valideForms('#order form');

    $('[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e){

        if (!$(this).valid()){
            return;
        }

        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'mailer/smart.php',
            data: $(this).serialize(),
        }).done(function(){
            $(this).find("input").val('');
            $('#consult, #order').fadeOut();
            $('.overlay, #notification').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    $(window).scroll(function(){
        if ($(this).scrollTop() > 1600){
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    new WOW().init();
});