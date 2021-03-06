<!DOCTYPE html>
<html>
    <head>
        <title>COVID-19 (coronavírus): Resultado da análise</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <meta name="description" content="Formulário de notificação desenvolvido com foco na comunicação de casos suspeitos/confirmados de COVID-19 (coronavírus).">
        <meta name="keywords" content="COVID-19, coronavírus, formulário de notificação, análise, sintomas, recomendação, consulta hospitalar, isolamento">
        <meta name="robots" content="all" />

        <link rel="shortcut icon" href="image/favicon.png" type="image/ico"/>
        <link rel="apple-touch-icon-precomposed" sizes="57x57" href="image/apple-touch-icon-iphone.png"/>
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="image/apple-touch-icon-ipad.png"/>
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="image/apple-touch-icon-iphone-retina.png"/>

        <!--Google Icon Font-->
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <!--Materialize-->
        <link type="text/css" rel="stylesheet" href="plugins/materialize/css/materialize.min.css" media="screen,projection"/>
        <!--Application style-->
        <link type="text/css" rel="stylesheet" href="application.css" rel="stylesheet" />

        <!--Let browser know website is optimized for mobile-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <!--[if lt IE 9]>
        <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->
    </head>
    <body>
        <main>
            <div class="container">
                <br />
                <div class="row">
                    <div class="col s12">
                        <div class="center-align">
                            <img class="main-logo" src="image/UFRJ-logo.png" alt="UFRJ" style="width: 120px;">
                            <img class="main-logo" src="image/PR4-logo.png" alt="PR4" style="width: 180px;">
                            <img class="main-logo" src="image/CTPS-logo.png" alt="CTPS" style="width: 140px;">
                        </div>
                        <div class="center">
                            <h4>COVID-19 (coronavírus): Formulário de notificação</h4>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12">
                        <div id="main-content">
                            <br />
                            <div class="card-panel z-depth-3">
                                <h5 class="valign-wrapper" style="color: green;">
                                    <i class="material-icons medium">check</i> 
                                    Salvo com sucesso
                                </h5>
                                <p>
                                    Os dados da notificação foram salvos com sucesso.
                                </p>
                                <p class="center">
                                    <a href="{{ route('form') }}">Realizar outra notificação</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12"><h4>Parceiros</h4></div>
                    <div class="col s12">
                        <div class="center-align">
                            <a href="http://labnet.nce.ufrj.br/">
                                <img class="responsive-img" src="image/logo-labnet.jpeg" alt="LabNet" title="LabNet" style="max-width: 100px;">
                            </a>
                            <a href="https://coppe.ufrj.br/">
                                <img class="responsive-img" src="image/logo-coppe.png" alt="COPPE" title="COPPE" style="max-width: 120px; margin-left: 25px;">
                            </a>
                            <a href="https://www.cos.ufrj.br/">
                                <img class="responsive-img" src="image/logo-pesc.png" alt="PESC" title="PESC" style="max-width: 120px; margin-left: 25px;">
                            </a>
                            <a href="http://lens.cos.ufrj.br/es/">
                                <img class="responsive-img" src="image/logo-lens.gif" alt="LENS" title="LENS" style="max-width: 250px; margin-left: 25px;">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <footer class="page-footer light-blue darken-3">
            <div class="container">
                <div class="row">
                    <div class="col s6">
                        <h5 class="white-text">COVID-19 (coronavírus): Formulário de notificação</h5>
                        <p class="grey-text text-lighten-4">Formulário de notificação desenvolvido com foco na comunicação de casos suspeitos/confirmados de COVID-19 (coronavírus).</p>
                    </div>
                    <div class="col offset-s2 s4">
                        <h5 class="white-text">Links úteis</h5>
                        <ul>
                            <li><a class="grey-text text-lighten-3" href="https://coronavirus.saude.gov.br/">O que é COVID-19 (coronavírus)?</a></li>
                            <li><a class="grey-text text-lighten-3" href="https://www.who.int/health-topics/coronavirus">OMS COVID-19 (coronavírus)</a></li>
                            <li><a class="grey-text text-lighten-3" href="https://www.bing.com/covid">Bing COVID-19 Tracker</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer-copyright">
                <div class="container center-align">
                    © 2020, enfrentamento à COVID-19 (coronavírus).
                </div>
            </div>
        </footer>

        <!--jQuery 3.1.1 -->
        <script type="text/javascript" src="plugins/jquery/jquery-3.1.1.js"></script>

        <!--Materialize-->
        <script type="text/javascript" src="plugins/materialize/js/materialize.min.js"></script>

        <!--Application scripts-->
        <script>const APP_URL = "{{ config('app.url') }}";</script>
    </body>
</html>