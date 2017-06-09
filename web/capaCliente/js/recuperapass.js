/**
 * Created by jabor on 24/03/2017.
 */
$(document).ready(function () {
	var $loader2 = $("#loader2");
	var $usuario = $("#usuario");
	var $pass1 = $("#pass1");
	var $resLogin = $("#resultadologin");
	var $enviar = $("#enviar");
	$loader2.slideUp("fast");
	$usuario.focus(function () {
		$resLogin.empty();
	});
	$pass1.focus(function () {
		$resLogin.empty();
	});
	$enviar.click(function () {
		$resLogin.empty();
		$loader2.slideDown("fast");
		$.ajax({
			url: "../capaServer/gestionjugadores.php"
			, async: true
			, type: 'post'
			, data: $("form").serialize()
			, timeout: 4000
			, success: function ($respuesta) {
				if ($respuesta == "No existe ningún usuario con ese correo") {
					$resLogin.empty().append("No existe ningún usuario con ese correo");
				}
				else if ($respuesta=="ok"){
					$resLogin.empty().append($respuesta);
					var timer = setTimeout(function () {
						$(location).attr('href', "inicio.php");
					}, 2000);
				} else {
                    $resLogin.empty().append($respuesta);
				}
			}
			, error: function () {
				$resLogin.empty().append("Error en la carga AjAx, por favor recargue la página e intentelo de nuevo");
			}
			, complete: function () {
				$loader2.slideUp("fast");
			}
		});
		return false;
	});
});