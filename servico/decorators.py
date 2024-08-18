from django.http import HttpResponseForbidden

def cliente_required(view_func):
    def _wrapped_view(request, *args, **kwargs):
        if request.user.nivel_acesso == 'cliente':
            return view_func(request, *args, **kwargs)
        return HttpResponseForbidden('Você não tem permissão para acessar esta página.')
    return _wrapped_view
