Jogo Othelo em javascript

O jogo é sempre iniciado pelo "Human" e dois modos de jogabilidades podem ser definidos. 
O modo básico o CPU não utiliza heurística nas suas jogadas. Não há uma inteligência nas jogadas, que são sortidas pelo CPU.
O modo completo utiliza heurística com Minimax com corte alpha-beta. O CPU analisa dentre as opções de jogada, qual é a melhor.  


Algumas coisas que ainda faltam implementar:
- Melhorar o modo completo, pois a heurística não está funcionando 100% e por isso não está incluída nessa versão.
- Fazê-lo funcionar no IE6. No momento funciona perfeitamente com Firefox e Safari.
- Passar a vez quando não não existe jogada. Existe um pequeno bug que pode ocorrer quando a CPU ficar sem jogada possível.


Esses item serão corrigidos até a data da PF para a versão final.