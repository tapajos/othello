Jogo Othelo em javascript

O jogo � sempre iniciado pelo "Human" e dois modos de jogabilidades podem ser definidos. 
O modo b�sico o CPU n�o utiliza heur�stica nas suas jogadas. N�o h� uma intelig�ncia nas jogadas, que s�o sortidas pelo CPU.
O modo completo utiliza heur�stica com Minimax com corte alpha-beta. O CPU analisa dentre as op��es de jogada, qual � a melhor.  


Algumas coisas que ainda faltam implementar:
- Melhorar o modo completo, pois a heur�stica n�o est� funcionando 100% e por isso n�o est� inclu�da nessa vers�o.
- Faz�-lo funcionar no IE6. No momento funciona perfeitamente com Firefox e Safari.
- Passar a vez quando n�o n�o existe jogada. Existe um pequeno bug que pode ocorrer quando a CPU ficar sem jogada poss�vel.


Esses item ser�o corrigidos at� a data da PF para a vers�o final.