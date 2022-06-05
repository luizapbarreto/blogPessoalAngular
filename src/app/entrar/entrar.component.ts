import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin()

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  entrar(){
    this.auth.logar(this.usuarioLogin).subscribe({
      next: (resp: UsuarioLogin)=>{
        this.usuarioLogin = resp
        environment.nome = this.usuarioLogin.nome
        environment.id = this.usuarioLogin.id
        environment.foto = this.usuarioLogin.foto
        environment.token = this.usuarioLogin.token
        environment.tipo = this.usuarioLogin.tipo

        this.router.navigate(['/inicio'])

      },
      error: erro =>{
        if(erro.status==401){
          alert('Usuario ou senha inválidos.')
        }
      }
    })
  }

}
