/**
 * Created by jabor on 24/03/2017.
 */
$(document).ready(function () {
	var $loader2 = $("#loader2");
	var $usuario = $("#usuario");
	var $pass1 = $("#pass1");
	var $resLogin = $("#resultadologin");
	var $enviar = $("#enviar");
	$loader2.toggle("fast");
	$usuario.focus(function () {
		$resLogin.empty();
	});
	$pass1.focus(function () {
		$resLogin.empty();
	});
	$enviar.click(function () {
		$resLogin.empty();
		$loader2.toggle("fast");
		$.ajax({
			url: "../capaServer/gestionjugadores.php"
			, async: true
			, type: 'post'
			, data: $("form").serialize()
			, timeout: 2000
			, success: function ($respuesta) {
				if ($respuesta == "ok") {
					$resLogin.empty().append("Usuario correcto");
					var timer = setTimeout(function () {
						$(location).attr('href', "panelcontrol.html");
					}, 1000);
				}
				else {
					$resLogin.empty().append($respuesta);
				}
			}
			, error: function () {
				$resLogin.empty().append("Error en la carga AjAx, por favor recargue la página e intentelo de nuevo");
			}
			, complete: function () {
				$loader2.toggle("fast");
			}
		});
		return false;
	});
});