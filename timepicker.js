(function ($) {
    var defaults = {
        format: "12",
        hours: 12,
        minutes: 0,
        seconds: 0,
        mode: "am"
    };
    var methods = {
        init: function (options) {
            //Initialize function
            options = $.extend({}, defaults, options);
            if (options.hour > 23 || options.hours < 0) {
                $.error('Error on Parameter "hours" when initializing jQuery.timepicker');
            }
            else if (options.minutes > 59 || options.minutes < 0) {
                $.error('Error on Parameter "minutes" when initializing jQuery.timepicker');
            }
            else if (options.seconds > 59 || options.seconds < 0) {
                $.error('Error on Parameter "seconds" when initializing jQuery.timepicker');
            }
            else if (options.mode.toLowerCase() != "am" && options.mode.toLowerCase() != "pm") {
                $.error('Error on Parameter "mode" when initializing jQuery.timepicker');
            }
            else if (options.format != "12" && options.format != "24") {
                $.error('Error on Parameter "format" when initializing jQuery.timepicker');
            }
            else {
                initialize(this, options);
            }


        },
        show: function () {
            //Show stuff
            this.show();
        },
        hide: function () {
            //Hide studd
            this.hide();
        },
        update: function (content) {
            //Update stuff
            if (content.hours != undefined) {
                var actual = this.children(".bgtimetext").children(".pgHours").val();
                if (this.children(".bgtimetext").children(".pgMode").is(":visible")) {
                    if (content.hours < 13 && content.hours > 0)
                        this.children(".bgtimetext").children(".pgHours").val(content.hours < 10 ? "0" + content.hours : content.hours);
                }
                else {
                    if (content.hours < 24 && content.hours >= 0)
                        this.children(".bgtimetext").children(".pgHours").val(content.hours < 10 ? "0" + content.hours : content.hours);
                }
            }
            if (content.minutes != undefined) {
                if (content.minutes < 60 && content.hours >= 0)
                    this.children(".bgtimetext").children(".pgMinutes").val(content.minutes < 10 ? "0" + content.minutes : content.minutes);
            }
            if (content.seconds != undefined) {
                if (content.seconds < 60 && content.seconds >= 0)
                    this.children(".bgtimetext").children(".pgSeconds").val(content.seconds < 10 ? "0" + content.seconds : content.seconds);
            }
            if (content.mode != undefined) {
                if (content.mode.toLowerCase() == "am" || content.mode.toLowerCase() == "pm")
                    this.children(".bgtimetext").children(".pgMode").val(content.mode.toLowerCase());
            }

        },
        getValues: function () {
            var obj = new Object();
            obj.hours = this.children(".bgtimetext").children(".pgHours").val();
            obj.minutes = this.children(".bgtimetext").children(".pgMinutes").val();
            obj.seconds = this.children(".bgtimetext").children(".pgSeconds").val();

            if (this.children(".bgtimetext").children(".pgMode").is(":visible")) {
                obj.format = 12;
                obj.mode = this.children(".bgtimetext").children(".pgMode").val();
                obj.toString = obj.hours + ":" + obj.minutes + ":" + obj.seconds + " " + obj.mode;
            }
            else {
                obj.toString = obj.hours + ":" + obj.minutes + ":" + obj.seconds;
            }
            return obj;
        },
        getValues24: function () {
            var obj = new Object();
            obj.hours = this.children(".bgtimetext").children(".pgHours").val();
            obj.minutes = this.children(".bgtimetext").children(".pgMinutes").val();
            obj.seconds = this.children(".bgtimetext").children(".pgSeconds").val();
            if (this.children(".bgtimetext").children(".pgMode").is(":visible")) {
                if (this.children(".bgtimetext").children(".pgMode").val() == "pm") {
                    if (obj.hours < 12) {
                        obj.hours = parseInt(obj.hours) + 12;
                    }
                }
                else {//am
                    //obj.hours = this.children(".bgtimetext").children(".pgHours").val();
                    if (obj.hours == 12)
                        obj.hours = 0;
                }
            }
            obj.toString = obj.hours + ":" + obj.minutes + ":" + obj.seconds;
            return obj;
        },
        disable: function (bValue) {
            if (bValue) {
                this.addClass("disabled");
                $("#"+this.attr("id")+" input").attr("disabled", true);
            }
            else {
                this.removeClass("disabled");
                $("#" + this.attr("id") + " input").attr("disabled", false);
            }

        }
    };
    $.fn.timepicker = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.timepicker');
        }
    }


    function blurMode($context, $value) {
        if ($context.val().toLowerCase() == "am" || $context.val().toLowerCase() == "pm") {
            return $context.val();
        }
        $context.val($value);
        return $value;
    }
    function initialize(esta, options) {
        return esta.each(function () {

            var $this = $(this);
            var $format = options.format;
            //var $hours = options.hours;
            var $minutes = options.minutes;
            var $seconds = options.seconds;
            var $mode = options.mode;
            if ($format == "12" && parseInt(options.hours) > 12) { $mode = "pm"; var $hours = parseInt(options.hours) - 12 } else var $hours = options.hours;
            var $selected = '';
            //set parent div a class
            $this.addClass("pgTimeContainer");
            //create text boxes
            $this.append("<div class='bgtimetext'></div>");
            $this.children(".bgtimetext").append("<input type='text' class='pgHours pgTime'/>:");
            $this.children(".bgtimetext").append("<input type='text' class='pgMinutes pgTime'/>:");
            $this.children(".bgtimetext").append("<input type='text' class='pgSeconds pgTime'/>");
            $selected = $this.children(".bgtimetext").children(".pgSeconds");
            $this.css("width", 100);
            if ($format == "12") {
                $this.css("width", 120);
                $this.children(".bgtimetext").append("<input type='text' class='pgMode pgTime' value='" + $mode + "'/>");
                $selected = $this.children(".bgtimetext").children(".pgMode");
            }
            $this.append("<div class='bgcontrols'></div>");
            $this.children(".bgcontrols").append("<span class='pgup'></span>");
            $this.children(".bgcontrols").append("<span class='pgdn'></span>");
            $this.append("<br style='clear:both;'/>")
            $this.children(".bgtimetext").children(".pgHours").val($hours < 10 ? "0" + $hours : $hours);
            $this.children(".bgtimetext").children(".pgMinutes").val($minutes < 10 ? "0" + $minutes : $minutes);
            $this.children(".bgtimetext").children(".pgSeconds").val($seconds < 10 ? "0" + $seconds : $seconds)
            //

            //
            $this.children(".bgtimetext").children(".pgHours").keydown(function (e) {
                if (!$this.hasClass("disabled")) {
                    if (e.keyCode == 38) {
                        $hours++;
                        if ($format == "24")
                            $hours = $hours > 23 ? 0 : $hours;
                        if ($format == "12")
                            $hours = $hours > 12 ? 1 : $hours;
                        $(this).val($hours < 10 ? "0" + $hours : $hours);
                    }
                    if (e.keyCode == 40) {
                        $hours--;
                        if ($format == "24")
                            $hours = $hours < 0 ? 23 : $hours;
                        if ($format == "12")
                            $hours = $hours < 1 ? 12 : $hours;
                        $(this).val($hours < 10 ? "0" + $hours : $hours);
                    }
                }

            });
            //Click
            $this.children(".bgcontrols").mousedown(function () { return false; })
            //minutos y segundos  keydown
            $this.children(".bgtimetext").children(".pgMinutes").keydown(function (e) {
                if (!$this.hasClass("disabled")) {
                    if (e.keyCode == 38 || e.keyCode == 40)
                        $minutes = minsec($(this), "minutes", $minutes, e);
                }
            });
            $this.children(".bgtimetext").children(".pgSeconds").keydown(function (e) {
                if (!$this.hasClass("disabled")) {
                    if (e.keyCode == 38 || e.keyCode == 40)
                        $seconds = minsec($(this), "seconds", $seconds, e);
                }
            });
            $this.children(".bgtimetext").children(".pgMode").keydown(function (e) {
                if (!$this.hasClass("disabled")) {
                    if (e.keyCode == 38 || e.keyCode == 40)
                        $(this).val() == "am" ? $(this).val("pm") : $(this).val("am");
                }
            });
            //Keyup
            $this.children(".bgtimetext").children(".pgHours").keyup(function (e) {
                if (!$this.hasClass("disabled")) {
                    var expresion = /^[0-9]+$/;
                    var valor = $(this).val(); // == "" ? 0 : $this.val();
                    var valorInt = 0;
                    var format = parseInt($format);
                    if (!(expresion.test(valor)) && valor != "") {
                        $(this).val($hours < 10 ? "0" + $hours : $hours);
                    }
                    else {
                        valorInt = parseInt(valor);
                        if (valorInt > format || valorInt < 0)
                            $(this).val($hours < 10 ? "0" + $hours : $hours);
                    }
                }
            });
            $this.children(".bgtimetext").children(".pgMinutes").keyup(function (e) {
                if (!$this.hasClass("disabled")) {
                    var expresion = /^[0-9]+$/;
                    var valor = $(this).val(); // == "" ? 0 : $this.val();
                    var valorInt = 0;
                    if (!(expresion.test(valor)) && valor != "") {
                        $(this).val($minutes < 10 ? "0" + $minutes : $minutes);
                    }
                    else {
                        valorInt = parseInt(valor);
                        if (valorInt > 59 || valorInt < 0)
                            $(this).val($minutes < 10 ? "0" + $minutes : $minutes);
                    }
                }
            });
            $this.children(".bgtimetext").children(".pgSeconds").keyup(function (e) {
                if (!$this.hasClass("disabled")) {
                    var expresion = /^[0-9]+$/;
                    var valor = $(this).val(); // == "" ? 0 : $this.val();
                    var valorInt = 0;
                    if (!(expresion.test(valor)) && valor != "") {
                        $(this).val($seconds < 10 ? "0" + $seconds : $seconds);
                    }
                    else {
                        valorInt = parseInt(valor);
                        if (valorInt > 59 || valorInt < 0)
                            $(this).val($seconds < 10 ? "0" + $seconds : $seconds);
                    }
                }
            });
            $this.children(".bgtimetext").children(".pgMode").keyup(function (e) { });
            //control click
            $this.children(".bgcontrols").children(".pgup").click(function () {
                if (!$this.hasClass("disabled")) {
                    $class = $.trim($selected.attr("class").replace("pgTime", ""));
                    switch ($class) {
                        case 'pgMode':
                            $selected.val() == "am" ? $selected.val("pm") : $selected.val("am");
                            break;
                        case 'pgHours':
                            $hours++;
                            if ($format == "24")
                                $hours = $hours > 23 ? 0 : $hours;
                            if ($format == "12")
                                $hours = $hours > 12 ? 1 : $hours;
                            $selected.val($hours < 10 ? "0" + $hours : $hours);
                            break;
                        case 'pgMinutes':
                            $minutes = minsec($selected, "minutes", $minutes, { keyCode: 38 });
                            break;
                        case 'pgSeconds':
                            $seconds = minsec($selected, "seconds", $seconds, { keyCode: 38 });
                            break;
                    }
                }
            });
            $this.children(".bgcontrols").children(".pgdn").click(function () {
                if (!$this.hasClass("disabled")) {
                    $class = $.trim($selected.attr("class").replace("pgTime", ""));
                    switch ($class) {
                        case 'pgMode':
                            $selected.val() == "am" ? $selected.val("pm") : $selected.val("am");
                            break;
                        case 'pgHours':
                            $hours--;
                            if ($format == "24")
                                $hours = $hours < 0 ? 23 : $hours;
                            if ($format == "12")
                                $hours = $hours < 1 ? 12 : $hours;
                            $selected.val($hours < 10 ? "0" + $hours : $hours);
                            break;
                        case 'pgMinutes':
                            $minutes = minsec($selected, "minutes", $minutes, { keyCode: 40 });
                            break;
                        case 'pgSeconds':
                            $seconds = minsec($selected, "seconds", $seconds, { keyCode: 40 });
                            break;
                    }
                }
            })
            //blur
            $this.children(".bgtimetext").children(".pgHours").blur(function () {
                $selected = $(this);
                if ($format == "24")
                    $hours = blurTime($(this), $hours, 23, 0, "hours");
                else
                    $hours = blurTime($(this), $hours, 12, 1, "hours");
            });
            $this.children(".bgtimetext").children(".pgMinutes").blur(function () {
                $selected = $(this);
                $minutes = blurTime($(this), $minutes, 59, 0, "minutes");
            });
            $this.children(".bgtimetext").children(".pgSeconds").blur(function () {
                $selected = $(this);
                $seconds = blurTime($(this), $seconds, 59, 0, "seconds");
            });
            //focus mode
            $this.children(".bgtimetext").children(".pgMode").blur(function () {
                $selected = $(this);
                $mode = blurMode($selected, $mode);
            });
            //focus
            $this.children(".bgtimetext").children(".pgHours").focus(function () {
                $selected = $(this);
                if ($format == "24")
                    $hours = blurTime($(this), $hours, 23, 0, "hours");
                else
                    $hours = blurTime($(this), $hours, 12, 1, "hours");
            });
            //focus de minutos
            $this.children(".bgtimetext").children(".pgMinutes").focus(function () {
                $selected = $(this);
                $minutes = blurTime($(this), $minutes, 59, 0, "minutes")
            });
            //focus de segundos
            $this.children(".bgtimetext").children(".pgSeconds").focus(function () {
                $selected = $(this);
                $seconds = blurTime($(this), $seconds, 59, 0, "seconds")
            });
            //focus mode
            $this.children(".bgtimetext").children(".pgMode").focus(function () {
                $selected = $(this);
                $mode = blurMode($selected, $mode);
            });
        });
    }
    //functions
    function minsec($context, $param, $value, event) {
        if (event.keyCode == 38) {
            $value += 1;
            $value = $value > 59 ? 0 : $value;
            $context.val($value < 10 ? "0" + $value : $value);
            return $value
        }
        if (event.keyCode == 40) {
            $value -= 1;
            $value = $value < 0 ? 59 : $value;
            $context.val($value < 10 ? "0" + $value : $value);
            return $value
        }
        else {
            if ("minutes")
                return $value;
        }
    }

    function blurTime($this, $val, max, min, type) {
        if ($this.val() != "") {
            var time = parseInt($this.val());
            if (time <= max && time >= min) {
                $this.val(time < 10 ? "0" + time : time);
                return time;
            }
            else {
                $this.val($val < 10 ? "0" + $val : $val);
                return $val;
            }
        }
        else {
            $this.val($val < 10 ? "0" + $val : $val);
            return $val;
        }
    }
})(jQuery);
